import "dotenv/config";
import { db } from "./index";
import { campaigns, creators, stats, submissions } from "./schema";

async function clearData() {
  console.log("🧹 Clearing database...");

  // Clear existing data
  await db.delete(submissions);
  await db.delete(campaigns);
  await db.delete(creators);
  await db.delete(stats);

  // Insert default stats only
  await db.insert(stats).values({
    id: "global",
    publishedCampaigns: 0,
    trackedTransactions: "0.00",
    verifiedPerformance: "0.00",
    activeCreators: 0,
    repeatBookings: "0.00",
  });

  console.log("✅ Database cleared successfully!");
  console.log("📊 Default stats created with zero values");
}

clearData()
  .catch((error) => {
    console.error("Error clearing database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
