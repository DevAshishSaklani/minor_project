'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-8 py-3 rounded-full font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: 'var(--white)',
        color: 'var(--text-on-light)',
        border: '1px solid var(--line)',
      }}
    >
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
