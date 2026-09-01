import { db } from "@/db";
import { stats } from "@/db/schema";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Try to get stats from database
    let statsData = await db.select().from(stats).limit(1);

    // If no stats exist, create default ones
    if (statsData.length === 0) {
      await db.insert(stats).values({
        id: "global",
        publishedCampaigns: 1247,
        trackedTransactions: "2400000.00",
        verifiedPerformance: "98.30",
        activeCreators: 450,
        repeatBookings: "89.00",
      });

      statsData = await db.select().from(stats).limit(1);
    }

    return NextResponse.json(statsData[0]);
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Return default stats if database error
    return NextResponse.json({
      id: "global",
      publishedCampaigns: 1247,
      trackedTransactions: "2400000.00",
      verifiedPerformance: "98.30",
      activeCreators: 450,
      repeatBookings: "89.00",
      updatedAt: new Date(),
    });
  }
}
