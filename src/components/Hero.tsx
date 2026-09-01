export default function Hero() {
  return (
    <section 
      className="px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-24"
      style={{ background: 'var(--paper)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-block px-4 py-2 rounded-full text-xs font-medium"
              style={{
                background: 'var(--sage)',
                color: 'var(--text-on-light)',
              }}
            >
              ✳ Now in public beta
            </div>

            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              style={{ 
                fontFamily: 'var(--font-space-grotesk)',
                color: 'var(--ink)',
              }}
            >
              Where good briefs find good people.
            </h1>

            <p 
              className="text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ color: 'var(--muted)' }}
            >
              CreatorBridge is the campaign marketplace for real momentum. 
              Less chasing. More making. Bring the brief, find the right creator, 
              and ship work that moves the needle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/signup"
                className="px-6 py-3.5 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-shadow text-center"
                style={{
                  background: 'var(--orange)',
                  color: 'var(--white)',
                }}
              >
                Start as a brand →
              </a>
              <a
                href="/signup"
                className="px-6 py-3.5 rounded-full font-semibold text-base text-center"
                style={{
                  background: 'var(--white)',
                  color: 'var(--text-on-light)',
                  border: '1px solid var(--line)',
                }}
              >
                Join as a creator
              </a>
            </div>
          </div>

          {/* Right Column - Hero Art */}
          <div className="relative">
            <div 
              className="aspect-square rounded-3xl overflow-hidden"
              style={{
                boxShadow: 'var(--shadow)',
              }}
            >
              <img 
                src="/hero-main.jpg" 
                alt="Campaign marketplace illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
