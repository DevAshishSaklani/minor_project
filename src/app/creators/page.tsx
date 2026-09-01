import { db } from "@/db";
import { creators } from "@/db/schema";
import { eq } from "drizzle-orm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function CreatorsPage() {
  const allCreators = await db
    .select()
    .from(creators)
    .where(eq(creators.verified, true));

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
              src="/creators-hero.jpg" 
              alt="Creators"
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
              Verified Creators
            </h1>
            <p 
              className="text-lg md:text-xl"
              style={{ color: 'var(--muted)' }}
            >
              Connect with talented creators for your next campaign
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCreators.map((creator) => (
              <div
                key={creator.id}
                className="p-6 rounded-2xl space-y-4 hover:shadow-lg transition-shadow"
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--line)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
                    style={{ background: 'var(--sage)' }}
                  >
                    {creator.avatarUrl ? (
                      <img 
                        src={creator.avatarUrl} 
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        👤
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-lg font-bold truncate"
                      style={{ 
                        fontFamily: 'var(--font-space-grotesk)',
                        color: 'var(--text-on-light)',
                      }}
                    >
                      {creator.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div 
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          background: 'var(--lavender)',
                          color: 'var(--text-on-light)',
                        }}
                      >
                        {creator.niche}
                      </div>
                      {creator.verified && (
                        <span 
                          className="text-xs"
                          style={{ color: 'var(--orange)' }}
                        >
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p 
                  className="text-sm leading-relaxed line-clamp-3"
                  style={{ color: 'var(--muted-on-light)' }}
                >
                  {creator.bio}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p 
                      className="text-xs"
                      style={{ color: 'var(--muted-on-light)' }}
                    >
                      {creator.platform}
                    </p>
                    <p 
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-on-light)' }}
                    >
                      {creator.audienceSize.toLocaleString()} followers
                    </p>
                  </div>
                  <div className="text-right">
                    <p 
                      className="text-xs"
                      style={{ color: 'var(--muted-on-light)' }}
                    >
                      Rating
                    </p>
                    <p 
                      className="text-sm font-semibold"
                      style={{ color: 'var(--orange)' }}
                    >
                      ★ {creator.rating}
                    </p>
                  </div>
                </div>

                <button
                  className="w-full px-4 py-2.5 rounded-full font-semibold text-sm"
                  style={{
                    background: 'var(--orange)',
                    color: 'var(--white)',
                  }}
                >
                  Contact →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
