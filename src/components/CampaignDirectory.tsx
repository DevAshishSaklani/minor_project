export default function CampaignDirectory() {
  return (
    <section 
      id="campaigns"
      className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-32"
      style={{ background: 'var(--paper)' }}
    >
      <div className="max-w-[900px] mx-auto text-center space-y-8">
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          style={{ 
            fontFamily: 'var(--font-space-grotesk)',
            color: 'var(--ink)',
          }}
        >
          Campaign directory
        </h2>

        <p 
          className="text-xl md:text-2xl leading-relaxed"
          style={{ color: 'var(--muted)' }}
        >
          Real briefs belong to real data.
        </p>

        <div 
          className="p-8 md:p-12 rounded-2xl space-y-4"
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
            No live campaigns published yet.
          </p>
          <p 
            className="text-sm leading-relaxed max-w-md mx-auto"
            style={{ color: 'var(--muted-on-light)' }}
          >
            Campaign listings will appear here once a brand connects its workspace and 
            publishes a real brief. Nothing on this page is presented as a customer campaign.
          </p>
        </div>
      </div>
    </section>
  );
}
