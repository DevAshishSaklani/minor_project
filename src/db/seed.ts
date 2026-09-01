import "dotenv/config";
import { db } from "./index";
import { campaigns, creators, stats, submissions } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(submissions);
  await db.delete(campaigns);
  await db.delete(creators);
  await db.delete(stats);

  // Insert stats
  await db.insert(stats).values({
    id: "global",
    publishedCampaigns: 1247,
    trackedTransactions: "2400000.00",
    verifiedPerformance: "98.30",
    activeCreators: 450,
    repeatBookings: "89.00",
  });

  console.log("✅ Stats seeded");

  // Insert sample creators
  const sampleCreators = [
    {
      id: "creator-1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      bio: "Tech reviewer and gadget enthusiast. Helping people make informed tech decisions.",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      niche: "Tech",
      platform: "YouTube",
      audienceSize: 250000,
      verified: true,
      rating: "4.85",
    },
    {
      id: "creator-2",
      name: "Marcus Rivera",
      email: "marcus@example.com",
      bio: "Fitness coach and lifestyle influencer. Building healthy habits one day at a time.",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      niche: "Fitness",
      platform: "Instagram",
      audienceSize: 180000,
      verified: true,
      rating: "4.92",
    },
    {
      id: "creator-3",
      name: "Emma Chen",
      email: "emma@example.com",
      bio: "Food blogger and recipe creator. Making cooking fun and accessible.",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      niche: "Food",
      platform: "TikTok",
      audienceSize: 420000,
      verified: true,
      rating: "4.78",
    },
    {
      id: "creator-4",
      name: "David Park",
      email: "david@example.com",
      bio: "Travel vlogger exploring the world one city at a time.",
      avatarUrl: "https://i.pravatar.cc/150?img=13",
      niche: "Travel",
      platform: "YouTube",
      audienceSize: 310000,
      verified: true,
      rating: "4.89",
    },
    {
      id: "creator-5",
      name: "Olivia Martinez",
      email: "olivia@example.com",
      bio: "Fashion and beauty content creator. Sharing style tips and beauty hacks.",
      avatarUrl: "https://i.pravatar.cc/150?img=9",
      niche: "Fashion",
      platform: "Instagram",
      audienceSize: 560000,
      verified: true,
      rating: "4.95",
    },
  ];

  await db.insert(creators).values(sampleCreators);
  console.log("✅ Creators seeded");

  // Insert sample campaigns
  const sampleCampaigns = [
    {
      id: "campaign-1",
      title: "Summer Product Launch",
      description: "Launch our new eco-friendly water bottle line with engaging content that highlights sustainability.",
      brandName: "EcoLife Products",
      budget: "5000.00",
      deadline: new Date("2024-08-15"),
      status: "active",
      contentFormat: "Video",
      objective: "Brand Awareness",
    },
    {
      id: "campaign-2",
      title: "Fitness App Promotion",
      description: "Create authentic workout content featuring our new fitness tracking app.",
      brandName: "FitTrack",
      budget: "7500.00",
      deadline: new Date("2024-07-30"),
      status: "active",
      contentFormat: "Video + Stories",
      objective: "App Downloads",
    },
    {
      id: "campaign-3",
      title: "Recipe Challenge",
      description: "Develop creative recipes using our new kitchen appliance with step-by-step tutorials.",
      brandName: "ChefMaster",
      budget: "4500.00",
      deadline: new Date("2024-09-01"),
      status: "active",
      contentFormat: "Video",
      objective: "Product Education",
    },
  ];

  await db.insert(campaigns).values(sampleCampaigns);
  console.log("✅ Campaigns seeded");

  console.log("🎉 Database seeded successfully!");
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
