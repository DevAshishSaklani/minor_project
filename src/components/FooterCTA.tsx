export default function FooterCTA() {
  return (
    <section 
      className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-32"
      style={{ 
        background: 'var(--lavender)',
      }}
    >
      <div className="max-w-[1000px] mx-auto text-center space-y-8">
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          style={{ 
            fontFamily: 'var(--font-space-grotesk)',
            color: 'var(--text-on-light)',
          }}
        >
          The bridge is open
        </h2>

        <p 
          className="text-xl md:text-2xl leading-relaxed"
          style={{ color: 'var(--muted-on-light)' }}
        >
          Ready to move the right work?
        </p>

        <p 
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          style={{ color: 'var(--muted-on-light)' }}
        >
          Start with a profile. Bring a brief. Let the work do the talking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="/signup"
            className="px-8 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-shadow text-center"
            style={{
              background: 'var(--orange)',
              color: 'var(--white)',
            }}
          >
            Create account
            <span className="ml-2">→</span>
          </a>
          <a
            href="/contact"
            className="px-8 py-4 rounded-full font-bold text-base text-center"
            style={{
              background: 'var(--white)',
              color: 'var(--text-on-light)',
              border: '1px solid var(--line)',
            }}
          >
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}
