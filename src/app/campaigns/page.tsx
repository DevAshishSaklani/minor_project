import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { eq } from "drizzle-orm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CampaignCard from "@/components/CampaignCard";

export const dynamic = "force-dynamic";

export default async function CampaignsPage() {
  const allCampaigns = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.status, "active"));

  return (
    <main>
      <Navigation />
      
      <section 
        className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24"
        style={{ background: 'var(--paper)', minHeight: 'calc(100vh - 200px)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Image */}
          <div className="mb-8 md:mb-12 rounded-3xl overflow-hidden max-w-4xl mx-auto">
            <img 
              src="/campaigns-hero.jpg" 
              alt="Campaigns"
              className="w-full h-48 md:h-64 lg:h-80 object-cover"
            />
          </div>

          <div className="mb-12 space-y-4 text-center">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{ 
                fontFamily: 'var(--font-space-grotesk)',
                color: 'var(--ink)',
              }}
            >
              Active Campaigns
            </h1>
            <p 
              className="text-lg md:text-xl"
              style={{ color: 'var(--muted)' }}
            >
              Browse live briefs and find your next project
            </p>
          </div>

          {allCampaigns.length === 0 ? (
            <div 
              className="p-12 rounded-2xl text-center space-y-4"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--line)',
              }}
            >
              <div 
                className="text-4xl"
                style={{ color: 'var(--orange)' }}
              >
                ✳
              </div>
              <p 
                className="text-lg font-semibold"
                style={{ color: 'var(--text-on-light)' }}
              >
                No active campaigns at the moment
              </p>
              <p 
                className="text-sm"
                style={{ color: 'var(--muted-on-light)' }}
              >
                Check back soon for new opportunities
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
