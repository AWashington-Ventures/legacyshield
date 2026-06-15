'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { trackCheckoutStarted } from '@/lib/analytics';

export default function SubscribePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');


  const handleCheckout = async (plan: 'community' | 'legacy_builder') => {
    setError('');
    setLoading(plan);
    // Track checkout initiation
    trackCheckoutStarted(plan, plan === 'legacy_builder' ? 1 : 1);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center px-6 py-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-[#d4a017] rounded-full flex items-center justify-center">
          <span className="text-[#0a1628] font-bold text-lg">L</span>
        </div>
        <span className="text-white font-bold text-xl tracking-tight">LegacyShield Pro</span>
      </Link>

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Start protecting your family today
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Your first month is just <span className="text-[#d4a017] font-bold">$1</span>. Full access. Cancel anytime.
        </p>
        {session?.user && (
          <p className="text-gray-500 text-sm mt-3">Signed in as {session.user.email}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/40 text-red-300 text-sm px-5 py-3 rounded-xl mb-8 max-w-md w-full text-center">
          {error}
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mb-10">
        {/* Community */}
        <div className="bg-[#0f2040] border border-[#1a3a5c] rounded-2xl p-7 flex flex-col">
          <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Community Member</div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-[#d4a017]">$1</span>
            <span className="text-gray-400 text-sm">first month</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">Then $39/month · Cancel anytime</p>
          <ul className="space-y-2.5 mb-8 flex-1">
            {[
              'Full video course library',
              'Monthly community workshops',
              'Life insurance guides & calculators',
              'Estate planning templates',
              'Private community access',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-gray-300 text-sm">
                <span className="text-[#d4a017] font-bold flex-shrink-0">✓</span> {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout('community')}
            disabled={loading !== null}
            className="w-full bg-[#d4a017] hover:bg-[#b8860b] disabled:opacity-60 text-[#0a1628] font-bold py-3.5 rounded-full text-sm transition-colors"
          >
            {loading === 'community' ? 'Redirecting...' : 'Join Community — $1 First Month'}
          </button>
        </div>

        {/* Legacy Builder */}
        <div className="bg-[#d4a017] rounded-2xl p-7 flex flex-col relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-[#0a1628] text-[#d4a017] text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>
          <div className="text-[#0a1628] text-xs font-bold uppercase tracking-widest mb-4">Legacy Builder</div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-[#0a1628]">$1</span>
            <span className="text-[#0a1628]/60 text-sm">first month</span>
          </div>
          <p className="text-[#0a1628]/60 text-sm mb-6">Then $99/month · Cancel anytime</p>
          <ul className="space-y-2.5 mb-8 flex-1">
            {[
              'Everything in Community',
              'Quarterly attorney consult credits',
              '1:1 legacy planning session/year',
              'Insurance policy review',
              'Priority workshop seating',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[#0a1628] text-sm">
                <span className="font-bold flex-shrink-0">✓</span> {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout('legacy_builder')}
            disabled={loading !== null}
            className="w-full bg-[#0a1628] hover:bg-[#0f2040] disabled:opacity-60 text-[#d4a017] font-bold py-3.5 rounded-full text-sm transition-colors"
          >
            {loading === 'legacy_builder' ? 'Redirecting...' : 'Build My Legacy — $1 First Month'}
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-gray-500 text-sm text-center max-w-sm">
        Secure payment via Stripe. No commitment — cancel before your second month and you won&apos;t be charged again.
      </p>

      {/* Sign out link */}
      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-300 transition-colors">← Back to home</Link>
        <span className="text-gray-700">·</span>
        <Link href="/api/auth/signout" className="text-gray-500 hover:text-gray-300 transition-colors">Sign out</Link>
      </div>
    </div>
  );
}
