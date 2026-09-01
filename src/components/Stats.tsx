async function getStats() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/stats`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

export default async function Stats() {
  const statsData = await getStats();

  const stats = statsData ? [
    { value: statsData.publishedCampaigns.toLocaleString(), label: 'published campaigns' },
    { value: `$${parseFloat(statsData.trackedTransactions).toLocaleString()}`, label: 'tracked transactions' },
    { value: `${parseFloat(statsData.verifiedPerformance).toFixed(1)}%`, label: 'verified performance' },
    { value: `${statsData.activeCreators}`, label: 'active creators' },
    { value: `${parseFloat(statsData.repeatBookings).toFixed(0)}%`, label: 'repeat bookings' },
  ] : [
    { value: '0', label: 'published campaigns' },
    { value: '$0', label: 'tracked transactions' },
    { value: '0%', label: 'verified performance' },
    { value: '0', label: 'active creators' },
    { value: '0%', label: 'repeat bookings' },
  ];

  return (
    <section 
      className="px-4 md:px-8 lg:px-12 py-8 md:py-12"
      style={{ 
        background: 'var(--white)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center space-y-2"
              style={{
                borderRight: index < stats.length - 1 && index !== 1 && index !== 3 ? '1px solid var(--line)' : 'none',
              }}
            >
              <div 
                className="text-3xl md:text-4xl font-bold"
                style={{ 
                  fontFamily: 'var(--font-space-grotesk)',
                  color: 'var(--text-on-light)',
                }}
              >
                {stat.value}
              </div>
              <div 
                className="text-xs md:text-sm"
                style={{ color: 'var(--muted-on-light)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div 
          className="mt-6 text-center text-xs"
          style={{ color: 'var(--muted-on-light)' }}
        >
          —<br />
          Live data is not connected. Frontend prototype only.
        </div>
      </div>
    </section>
  );
}
