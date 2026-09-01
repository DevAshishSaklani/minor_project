'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'brand' | 'creator'>('brand');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    password: '',
    niche: 'Tech',
    platform: 'YouTube',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          userType,
          companyName: userType === 'brand' ? formData.companyName : undefined,
          niche: userType === 'creator' ? formData.niche : undefined,
          platform: userType === 'creator' ? formData.platform : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      // Redirect to dashboard using window.location for proper navigation
      window.location.href = '/dashboard';
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <main>
      <Navigation />
      
      <section 
        className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24"
        style={{ background: 'var(--paper)', minHeight: 'calc(100vh - 200px)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center space-y-4">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{ 
                fontFamily: 'var(--font-space-grotesk)',
                color: 'var(--ink)',
              }}
            >
              Get Started
            </h1>
            <p 
              className="text-lg md:text-xl"
              style={{ color: 'var(--muted)' }}
            >
              Join CreatorBridge and start building meaningful campaigns
            </p>
          </div>

          {/* User Type Selection */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUserType('brand')}
              className="flex-1 px-6 py-4 rounded-2xl font-semibold text-base transition-all"
              style={{
                background: userType === 'brand' ? 'var(--orange)' : 'var(--white)',
                color: userType === 'brand' ? 'var(--white)' : 'var(--text-on-light)',
                border: userType === 'brand' ? 'none' : '1px solid var(--line)',
              }}
            >
              I'm a Brand
            </button>
            <button
              onClick={() => setUserType('creator')}
              className="flex-1 px-6 py-4 rounded-2xl font-semibold text-base transition-all"
              style={{
                background: userType === 'creator' ? 'var(--orange)' : 'var(--white)',
                color: userType === 'creator' ? 'var(--white)' : 'var(--text-on-light)',
                border: userType === 'creator' ? 'none' : '1px solid var(--line)',
              }}
            >
              I'm a Creator
            </button>
          </div>

          {/* Signup Form */}
          <div 
            className="p-8 md:p-12 rounded-3xl space-y-6"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow)',
            }}
          >
            {error && (
              <div 
                className="p-4 rounded-xl text-sm"
                style={{
                  background: '#fee',
                  border: '1px solid #fcc',
                  color: '#c00',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {userType === 'brand' && (
                <div>
                  <label 
                    htmlFor="companyName"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-on-light)' }}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl text-base"
                    placeholder="Your company name"
                    style={{
                      background: 'var(--paper)',
                      border: '1px solid var(--line)',
                      color: 'var(--ink)',
                    }}
                  />
                </div>
              )}

              <div>
                <label 
                  htmlFor="fullName"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-on-light)' }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-base"
                  placeholder="Your full name"
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                  }}
                />
              </div>

              <div>
                <label 
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-on-light)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl text-base"
                  placeholder="you@example.com"
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                  }}
                />
              </div>

              <div>
                <label 
                  htmlFor="password"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: 'var(--text-on-light)' }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl text-base"
                  placeholder="Create a password (min 6 characters)"
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                  }}
                />
              </div>

              {userType === 'creator' && (
                <>
                  <div>
                    <label 
                      htmlFor="niche"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--text-on-light)' }}
                    >
                      Content Niche
                    </label>
                    <select
                      id="niche"
                      value={formData.niche}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-base"
                      style={{
                        background: 'var(--paper)',
                        border: '1px solid var(--line)',
                        color: 'var(--ink)',
                      }}
                    >
                      <option>Tech</option>
                      <option>Fitness</option>
                      <option>Food</option>
                      <option>Travel</option>
                      <option>Fashion</option>
                      <option>Lifestyle</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label 
                      htmlFor="platform"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: 'var(--text-on-light)' }}
                    >
                      Primary Platform
                    </label>
                    <select
                      id="platform"
                      value={formData.platform}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-base"
                      style={{
                        background: 'var(--paper)',
                        border: '1px solid var(--line)',
                        color: 'var(--ink)',
                      }}
                    >
                      <option>YouTube</option>
                      <option>Instagram</option>
                      <option>TikTok</option>
                      <option>Twitter</option>
                      <option>LinkedIn</option>
                      <option>Other</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'var(--orange)',
                  color: 'var(--white)',
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>
            </form>

            <div className="text-center pt-4">
              <p 
                className="text-sm"
                style={{ color: 'var(--muted-on-light)' }}
              >
                Already have an account?{' '}
                <a 
                  href="/login"
                  className="font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--orange)' }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="p-6 rounded-2xl space-y-2"
              style={{
                background: 'var(--sage)',
              }}
            >
              <h3 
                className="text-lg font-bold"
                style={{ 
                  fontFamily: 'var(--font-space-grotesk)',
                  color: 'var(--text-on-light)',
                }}
              >
                {userType === 'brand' ? 'For Brands' : 'For Creators'}
              </h3>
              <ul 
                className="space-y-2 text-sm"
                style={{ color: 'var(--muted-on-light)' }}
              >
                {userType === 'brand' ? (
                  <>
                    <li>✓ Post unlimited campaigns</li>
                    <li>✓ Access verified creators</li>
                    <li>✓ Track campaign performance</li>
                    <li>✓ Secure payment processing</li>
                  </>
                ) : (
                  <>
                    <li>✓ Find relevant brand partnerships</li>
                    <li>✓ Get paid for quality work</li>
                    <li>✓ Build your portfolio</li>
                    <li>✓ Join a trusted network</li>
                  </>
                )}
              </ul>
            </div>

            <div 
              className="p-6 rounded-2xl space-y-2"
              style={{
                background: 'var(--lavender)',
              }}
            >
              <h3 
                className="text-lg font-bold"
                style={{ 
                  fontFamily: 'var(--font-space-grotesk)',
                  color: 'var(--text-on-light)',
                }}
              >
                Why CreatorBridge?
              </h3>
              <ul 
                className="space-y-2 text-sm"
                style={{ color: 'var(--muted-on-light)' }}
              >
                <li>✓ Transparent workflow</li>
                <li>✓ Fair pricing</li>
                <li>✓ Quality-focused matching</li>
                <li>✓ Reliable support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
