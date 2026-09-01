import { db } from "@/db";
import { creators } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allCreators = await db
      .select()
      .from(creators)
      .where(eq(creators.verified, true))
      .limit(20);

    return NextResponse.json(allCreators);
  } catch (error) {
    console.error("Error fetching creators:", error);
    return NextResponse.json([]);
  }
}
