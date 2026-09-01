import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allCampaigns = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.status, "active"))
      .limit(10);

    return NextResponse.json(allCampaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session || session.user.userType !== "brand") {
      return NextResponse.json(
        { error: "Unauthorized. Only brands can create campaigns." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      detailedDescription,
      budget,
      deadline,
      contentFormat,
      objective,
      minFollowers,
      requiredNiche,
      requiredPlatform,
    } = body;

    // Validate required fields
    if (!title || !description || !budget || !deadline || !contentFormat || !objective) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create campaign
    const campaignId = randomBytes(16).toString("hex");
    const brandName = session.user.companyName || session.user.fullName;

    const newCampaign = await db.insert(campaigns).values({
      id: campaignId,
      title,
      description,
      detailedDescription: detailedDescription || null,
      brandName,
      brandId: session.user.id,
      budget: budget.toString(),
      deadline: new Date(deadline),
      contentFormat,
      objective,
      minFollowers: minFollowers ? parseInt(minFollowers) : 0,
      requiredNiche: requiredNiche || null,
      requiredPlatform: requiredPlatform || null,
      status: "active",
    }).returning();

    return NextResponse.json(newCampaign[0], { status: 201 });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}
