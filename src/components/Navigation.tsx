'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav 
      style={{ 
        borderBottom: '1px solid var(--line)',
        background: 'var(--paper)',
      }}
      className="px-4 md:px-8 lg:px-12 py-4 sticky top-0 z-50"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center gap-2"
          style={{ color: 'var(--ink)' }}
        >
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
          <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            CreatorBridge
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="/" 
            className="text-sm font-medium hover:opacity-70"
            style={{ color: 'var(--ink)' }}
          >
            Home
          </a>
          <a 
            href="/campaigns" 
            className="text-sm font-medium hover:opacity-70"
            style={{ color: 'var(--ink)' }}
          >
            Campaigns
          </a>
          <a 
            href="/creators" 
            className="text-sm font-medium hover:opacity-70"
            style={{ color: 'var(--ink)' }}
          >
            Creators
          </a>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:opacity-70"
            style={{ color: 'var(--ink)' }}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a
            href="/signup"
            className="px-5 py-2.5 rounded-full font-medium text-sm inline-block"
            style={{
              background: 'var(--orange)',
              color: 'var(--white)',
            }}
          >
            Get started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2"
            style={{ color: 'var(--ink)' }}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            style={{ color: 'var(--ink)' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden mt-4 pt-4"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <div className="flex flex-col gap-4">
            <a 
              href="/" 
              className="text-sm font-medium"
              style={{ color: 'var(--ink)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/campaigns" 
              className="text-sm font-medium"
              style={{ color: 'var(--ink)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Campaigns
            </a>
            <a 
              href="/creators" 
              className="text-sm font-medium"
              style={{ color: 'var(--ink)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Creators
            </a>
            <a
              href="/signup"
              className="px-5 py-2.5 rounded-full font-medium text-sm w-full inline-block text-center"
              style={{
                background: 'var(--orange)',
                color: 'var(--white)',
              }}
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
