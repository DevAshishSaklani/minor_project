import { db } from "@/db";
import { sql } from "drizzle-orm";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CampaignDirectory from "@/components/CampaignDirectory";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Verify database connection
  await db.execute(sql`select 1`);

  return (
    <main>
      <Navigation />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <CampaignDirectory />
      <FooterCTA />
      <Footer />
    </main>
  );
}
