export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Write the brief',
      description: 'Set the objective, content format, deadline, and the signal that matters.',
      featured: false,
    },
    {
      number: '02',
      title: 'Meet the right creators',
      description: 'Browse people by niche, platform, audience, and the quality of their work.',
      featured: true,
      icon: '↗',
    },
    {
      number: '03',
      title: 'Review the signal',
      description: 'Track submissions, eligible views, and earnings in one calm workspace.',
      featured: false,
    },
  ];

  return (
    <section 
      id="how-it-works"
      className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-32"
      style={{ background: 'var(--paper)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 space-y-6">
          <div className="inline-block px-4 py-2 rounded-full text-xs font-medium"
            style={{
              background: 'var(--lavender)',
              color: 'var(--text-on-light)',
            }}
          >
            The useful middle
          </div>

          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl"
            style={{ 
              fontFamily: 'var(--font-space-grotesk)',
              color: 'var(--ink)',
            }}
          >
            A workflow that keeps the work moving.
          </h2>

          <p 
            className="text-lg md:text-xl leading-relaxed max-w-3xl"
            style={{ color: 'var(--muted)' }}
          >
            Less chasing. More making. Every campaign has a clear next step, 
            visible ownership, and the context to make a good call.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 md:p-8 rounded-2xl space-y-4 relative"
              style={{
                background: step.featured ? 'var(--white)' : 'transparent',
                border: step.featured ? '2px solid var(--orange)' : '1px solid var(--line)',
                boxShadow: step.featured ? 'var(--shadow)' : 'none',
              }}
            >
              {step.icon && (
                <div 
                  className="absolute top-6 right-6 text-2xl"
                  style={{ color: 'var(--orange)' }}
                >
                  {step.icon}
                </div>
              )}
              
              <div 
                className="text-sm font-bold"
                style={{ 
                  color: step.featured ? 'var(--orange)' : 'var(--muted)',
                }}
              >
                {step.number}
              </div>
              
              <h3 
                className="text-xl md:text-2xl font-bold"
                style={{ 
                  fontFamily: 'var(--font-space-grotesk)',
                  color: step.featured ? 'var(--text-on-light)' : 'var(--ink)',
                }}
              >
                {step.title}
              </h3>
              
              <p 
                className="text-sm md:text-base leading-relaxed"
                style={{ 
                  color: step.featured ? 'var(--muted-on-light)' : 'var(--muted)',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
