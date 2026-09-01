import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { campaignApplications, campaigns, users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { randomBytes } from "crypto";
import { eq, and } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session || session.user.userType !== "creator") {
      return NextResponse.json(
        { error: "Unauthorized. Only creators can apply to campaigns." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { proposal } = body;

    if (!proposal || proposal.trim().length === 0) {
      return NextResponse.json(
        { error: "Proposal is required" },
        { status: 400 }
      );
    }

    const { id: campaignId } = await params;

    // Check if campaign exists
    const campaignResults = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.id, campaignId))
      .limit(1);

    if (campaignResults.length === 0) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    const campaign = campaignResults[0];

    // Check if campaign is still active
    if (campaign.status !== "active") {
      return NextResponse.json(
        { error: "This campaign is no longer accepting applications" },
        { status: 400 }
      );
    }

    // Check if deadline has passed
    if (new Date(campaign.deadline) < new Date()) {
      return NextResponse.json(
        { error: "The application deadline has passed" },
        { status: 400 }
      );
    }

    // Check eligibility criteria
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const creator = user[0];

    // Check niche requirement
    if (campaign.requiredNiche && creator.niche !== campaign.requiredNiche) {
      return NextResponse.json(
        { error: `This campaign requires creators in the ${campaign.requiredNiche} niche` },
        { status: 403 }
      );
    }

    // Check platform requirement
    if (campaign.requiredPlatform && creator.platform !== campaign.requiredPlatform) {
      return NextResponse.json(
        { error: `This campaign requires creators on ${campaign.requiredPlatform}` },
        { status: 403 }
      );
    }

    // Check if already applied
    const existingApplication = await db
      .select()
      .from(campaignApplications)
      .where(
        and(
          eq(campaignApplications.campaignId, campaignId),
          eq(campaignApplications.userId, session.user.id)
        )
      )
      .limit(1);

    if (existingApplication.length > 0) {
      return NextResponse.json(
        { error: "You have already applied to this campaign" },
        { status: 400 }
      );
    }

    // Create application
    const applicationId = randomBytes(16).toString("hex");

    const newApplication = await db
      .insert(campaignApplications)
      .values({
        id: applicationId,
        campaignId,
        userId: session.user.id,
        proposal,
        status: "pending",
      })
      .returning();

    return NextResponse.json(newApplication[0], { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

// Get application status for a campaign
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(null);
    }

    const { id: campaignId } = await params;

    const application = await db
      .select()
      .from(campaignApplications)
      .where(
        and(
          eq(campaignApplications.campaignId, campaignId),
          eq(campaignApplications.userId, session.user.id)
        )
      )
      .limit(1);

    if (application.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(application[0]);
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(null);
  }
}
