export default function Features() {
  return (
    <section 
      id="features"
      className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-32"
      style={{ 
        background: 'var(--sage)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Visual */}
          <div 
            className="aspect-video rounded-3xl overflow-hidden order-2 lg:order-1"
            style={{
              boxShadow: 'var(--shadow)',
            }}
          >
            <img 
              src="/features-visual.jpg" 
              alt="Campaign dashboard illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-block px-4 py-2 rounded-full text-xs font-medium"
              style={{
                background: 'var(--white)',
                color: 'var(--text-on-light)',
              }}
            >
              For brands & creators
            </div>

            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ 
                fontFamily: 'var(--font-space-grotesk)',
                color: 'var(--text-on-light)',
              }}
            >
              Make something worth measuring.
            </h2>

            <p 
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: 'var(--muted-on-light)' }}
            >
              CreatorBridge is where the creative brief becomes a shared source of truth. 
              Brands get a reliable workflow. Creators get a fairer way to find work that fits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/signup"
                className="px-6 py-3 rounded-full font-semibold text-sm text-center"
                style={{
                  background: 'var(--orange)',
                  color: 'var(--white)',
                }}
              >
                Start as a brand →
              </a>
              <a
                href="/signup"
                className="px-6 py-3 rounded-full font-semibold text-sm text-center"
                style={{
                  background: 'var(--white)',
                  color: 'var(--text-on-light)',
                  border: '1px solid var(--line)',
                }}
              >
                Join as a creator →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
