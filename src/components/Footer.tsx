export default function Footer() {
  const footerSections = [
    {
      title: 'Platform',
      links: ['How it works', 'For brands', 'For creators', 'Pricing', 'Examples'],
    },
    {
      title: 'Resources',
      links: ['Documentation', 'API Reference', 'Blog', 'Case studies', 'Help center'],
    },
    {
      title: 'Company',
      links: ['About us', 'Careers', 'Contact', 'Privacy', 'Terms'],
    },
  ];

  return (
    <footer 
      className="px-4 md:px-8 lg:px-12 py-12 md:py-16"
      style={{ 
        background: 'var(--paper-deep)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg 
                className="brand-mark" 
                width="28" 
                height="28" 
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Bridge icon */}
                <circle cx="14" cy="14" r="14" fill="var(--orange)" />
                <path 
                  d="M7 16 L10 13 L14 17 L18 13 L21 16" 
                  stroke="var(--white)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="10" cy="13" r="1.5" fill="var(--white)" />
                <circle cx="18" cy="13" r="1.5" fill="var(--white)" />
              </svg>
              <span 
                className="font-bold text-lg"
                style={{ 
                  fontFamily: 'var(--font-space-grotesk)',
                  color: 'var(--ink)',
                }}
              >
                CreatorBridge
              </span>
            </div>
            <p 
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'var(--muted)' }}
            >
              The campaign marketplace for real momentum. Where good briefs find good people.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 
                className="text-sm font-bold"
                style={{ 
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-space-grotesk)',
                }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-sm hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--muted)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p 
            className="text-xs"
            style={{ color: 'var(--muted)' }}
          >
            CreatorBridge
          </p>
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-xs hover:opacity-70 transition-opacity"
              style={{ color: 'var(--muted)' }}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-xs hover:opacity-70 transition-opacity"
              style={{ color: 'var(--muted)' }}
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-xs hover:opacity-70 transition-opacity"
              style={{ color: 'var(--muted)' }}
            >
              Cookie Settings
            </a>
          </div>
        </div>

        {/* Built with love */}
        <div className="mt-8 text-center">
          <p 
            className="text-xs"
            style={{ color: 'var(--muted)' }}
          >
            Built with ❤️ for campaigns that matter
          </p>
        </div>
      </div>
    </footer>
  );
}
