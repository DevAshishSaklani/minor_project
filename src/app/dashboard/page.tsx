import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <main>
      <Navigation />
      
      <section 
        className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24"
        style={{ background: 'var(--paper)', minHeight: 'calc(100vh - 200px)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 space-y-4">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{ 
                fontFamily: 'var(--font-space-grotesk)',
                color: 'var(--ink)',
              }}
            >
              Welcome, {user.fullName}!
            </h1>
            <p 
              className="text-lg md:text-xl"
              style={{ color: 'var(--muted)' }}
            >
              Your CreatorBridge Dashboard
            </p>
          </div>

          {/* User Info Card */}
          <div 
            className="p-8 rounded-3xl space-y-6 mb-8"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="flex items-center justify-between">
              <h2 
                className="text-2xl font-bold"
                style={{ 
                  fontFamily: 'var(--font-space-grotesk)',
                  color: 'var(--text-on-light)',
                }}
              >
                Account Information
              </h2>
              <div 
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: user.userType === 'brand' ? 'var(--sage)' : 'var(--lavender)',
                  color: 'var(--text-on-light)',
                }}
              >
                {user.userType === 'brand' ? '🏢 Brand' : '✨ Creator'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p 
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--muted-on-light)' }}
                >
                  Full Name
                </p>
                <p 
                  className="text-base"
                  style={{ color: 'var(--text-on-light)' }}
                >
                  {user.fullName}
                </p>
              </div>

              <div>
                <p 
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--muted-on-light)' }}
                >
                  Email
                </p>
                <p 
                  className="text-base"
                  style={{ color: 'var(--text-on-light)' }}
                >
                  {user.email}
                </p>
              </div>

              {user.companyName && (
                <div>
                  <p 
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--muted-on-light)' }}
                  >
                    Company Name
                  </p>
                  <p 
                    className="text-base"
                    style={{ color: 'var(--text-on-light)' }}
                  >
                    {user.companyName}
                  </p>
                </div>
              )}

              {user.niche && (
                <div>
                  <p 
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--muted-on-light)' }}
                  >
                    Content Niche
                  </p>
                  <p 
                    className="text-base"
                    style={{ color: 'var(--text-on-light)' }}
                  >
                    {user.niche}
                  </p>
                </div>
              )}

              {user.platform && (
                <div>
                  <p 
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--muted-on-light)' }}
                  >
                    Primary Platform
                  </p>
                  <p 
                    className="text-base"
                    style={{ color: 'var(--text-on-light)' }}
                  >
                    {user.platform}
                  </p>
                </div>
              )}

              <div>
                <p 
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--muted-on-light)' }}
                >
                  Account Status
                </p>
                <p 
                  className="text-base"
                  style={{ color: 'var(--text-on-light)' }}
                >
                  {user.verified ? '✓ Verified' : '⏳ Pending Verification'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {user.userType === 'brand' ? (
              <>
                <a
                  href="/campaigns/create"
                  className="p-8 rounded-2xl hover:shadow-lg transition-shadow"
                  style={{
                    background: 'var(--orange)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      fontFamily: 'var(--font-space-grotesk)',
                      color: 'var(--white)',
                    }}
                  >
                    ✨ Create Campaign
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--white)', opacity: 0.9 }}
                  >
                    Launch a new brand partnership opportunity
                  </p>
                </a>

                <a
                  href="/creators"
                  className="p-8 rounded-2xl hover:shadow-lg transition-shadow"
                  style={{
                    background: 'var(--lavender)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      fontFamily: 'var(--font-space-grotesk)',
                      color: 'var(--text-on-light)',
                    }}
                  >
                    Find Creators
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--muted-on-light)' }}
                  >
                    Connect with verified content creators
                  </p>
                </a>
              </>
            ) : (
              <>
                <a
                  href="/campaigns"
                  className="p-8 rounded-2xl hover:shadow-lg transition-shadow"
                  style={{
                    background: 'var(--sage)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      fontFamily: 'var(--font-space-grotesk)',
                      color: 'var(--text-on-light)',
                    }}
                  >
                    Browse Campaigns
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--muted-on-light)' }}
                  >
                    Find brand partnerships that match your niche
                  </p>
                </a>

                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background: 'var(--lavender)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      fontFamily: 'var(--font-space-grotesk)',
                      color: 'var(--text-on-light)',
                    }}
                  >
                    My Applications
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--muted-on-light)' }}
                  >
                    Track your campaign submissions (Coming soon)
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Logout Button */}
          <div className="text-center">
            <LogoutButton />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
