'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="max-w-md mx-auto">
          <div className="mb-12 text-center space-y-4">
            <h1 
              className="text-4xl md:text-5xl font-bold"
              style={{ 
                fontFamily: 'var(--font-space-grotesk)',
                color: 'var(--ink)',
              }}
            >
              Welcome Back
            </h1>
            <p 
              className="text-lg"
              style={{ color: 'var(--muted)' }}
            >
              Sign in to your CreatorBridge account
            </p>
          </div>

          {/* Login Form */}
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
                  className="w-full px-4 py-3 rounded-xl text-base"
                  placeholder="Enter your password"
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'var(--orange)',
                  color: 'var(--white)',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <div className="text-center pt-4">
              <p 
                className="text-sm"
                style={{ color: 'var(--muted-on-light)' }}
              >
                Don't have an account?{' '}
                <a 
                  href="/signup"
                  className="font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--orange)' }}
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
