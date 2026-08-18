'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function PrivacyGuidePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prevAddresses, setPrevAddresses] = useState<string[]>(['']);

  const addPrevAddress = () => setPrevAddresses(prev => [...prev, '']);
  const updatePrevAddress = (idx: number, val: string) => {
    setPrevAddresses(prev => prev.map((a, i) => (i === idx ? val : a)));
  };
  const removePrevAddress = (idx: number) => {
    setPrevAddresses(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      dob: (form.elements.namedItem('dob') as HTMLInputElement).value,
      currentAddress: (form.elements.namedItem('currentAddress') as HTMLInputElement).value,
      previousAddresses: prevAddresses.filter(a => a.trim()),
      additionalNames: (form.elements.namedItem('additionalNames') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/privacy-guide/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.url) {
        setError(result.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }
      window.location.href = result.url;
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#0a1628] border border-[#1a3a5c] text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a017] transition-colors';

  return (
    <div className="min-h-screen bg-[#0a1628] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12 justify-center">
          <div className="w-10 h-10 bg-[#d4a017] rounded-full flex items-center justify-center">
            <span className="text-[#0a1628] font-bold text-lg">L</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">LegacyShield Pro</span>
        </Link>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Privacy Shield Guide
          </h1>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Your personal information is being sold. We&apos;ll show you exactly how to remove it — step by step.
          </p>
        </div>

        {/* What You Get */}
        <div className="bg-[#0f2040] border border-[#1a3a5c] rounded-2xl p-6 mb-8">
          <p className="text-[#d4a017] font-bold text-sm uppercase tracking-widest mb-4">What&apos;s Included</p>
          <ul className="space-y-3">
            {[
              '18 data broker sites — HIGH and MEDIUM priority',
              'Step-by-step opt-out instructions for each site',
              'Direct opt-out URLs — no searching required',
              'Checkboxes to track your progress',
              'Personalized with your name, addresses, and info',
              'Delivered instantly to your email as a PDF',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="text-[#d4a017] font-bold flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Important Note */}
        <div className="bg-[#1a2a10] border border-[#4a7a20] rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">📧</span>
            <div>
              <p className="text-[#7dc43f] font-bold text-sm uppercase tracking-widest mb-1">Important — Monitor Your Email</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                After submitting opt-out requests, <strong className="text-white">continue to monitor your email inbox for further instructions from these companies</strong>. Many data brokers will send verification emails, follow-up instructions, or confirmation messages that require your action to complete the removal process. Check your inbox — and your spam/junk folder — regularly until all opt-outs are fully confirmed.
              </p>
            </div>
          </div>
        </div>

        {/* Why No App Can Do This */}
        <div className="rounded-2xl p-6 mb-8" style={{background:'rgba(201,168,76,0.05)', border:'1px solid rgba(201,168,76,0.2)'}}>
          <p className="text-[#d4a017] font-black text-xs uppercase tracking-widest mb-3">⚠️ Why No App Can Do This For You</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Many apps and automated services advertise instant data removal — but here&apos;s the truth: every data broker requires you to <strong className="text-white">verify your identity as a real human being</strong> through confirmation emails, CAPTCHA checks, and identity verification that no app, download, or AI tool can complete on your behalf.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Additionally, some third-party removal services may have undisclosed relationships with data aggregators — meaning the company you trusted to &ldquo;delete&rdquo; your information may be connected to organizations that continue to process it through affiliated channels.
          </p>
          <p className="text-[#d4a017] text-sm font-bold">
            The only guaranteed method is doing it yourself — directly, on each site — and confirming your identity as a human at every step. That&apos;s exactly what this guide walks you through.
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#0f2040] border border-[#1a3a5c] rounded-2xl p-8">
          <h2 className="text-white font-bold text-xl mb-2">Enter Your Information</h2>
          <p className="text-gray-500 text-sm mb-6">
            This information is used only to personalize your guide and is never shared or sold.
          </p>

          {error && (
            <div className="bg-red-900/30 border border-red-500/40 text-red-300 text-sm px-5 py-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest block mb-2">First Name</label>
                <input name="firstName" required placeholder="Anthony" className={inputClass} />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest block mb-2">Last Name</label>
                <input name="lastName" required placeholder="Washington" className={inputClass} />
              </div>
            </div>

            {/* Additional Names */}
            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                Additional Names Used <span className="text-gray-600 font-normal normal-case">(optional)</span>
              </label>
              <input
                name="additionalNames"
                placeholder="e.g., maiden name, former last name, or alias"
                className={inputClass}
              />
              <p className="text-gray-500 text-xs mt-1">Include any maiden names, former last names, or other names you have used. Data brokers often store records under previous names — including these ensures those records are found and removed as well.</p>
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest block mb-2">Email Address</label>
              <input name="email" type="email" required placeholder="you@email.com" className={inputClass} />
              <p className="text-gray-600 text-xs mt-1">Your guide will be sent here.</p>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest block mb-2">Date of Birth</label>
              <input name="dob" type="date" required className={inputClass} />
              <p className="text-gray-500 text-xs mt-1">Data brokers use your date of birth to link records under your name across multiple databases. Providing it ensures the exact record associated with you is located and removed — not just records that share your name.</p>
            </div>

            {/* Current Address */}
            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest block mb-2">Current Address</label>
              <input
                name="currentAddress"
                required
                placeholder="123 Main St, Washington DC 20019"
                className={inputClass}
              />
            </div>

            {/* Previous Addresses */}
            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest block mb-2">
                Previous Addresses <span className="text-gray-600 font-normal normal-case">(optional)</span>
              </label>
              {prevAddresses.map((addr, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    value={addr}
                    onChange={e => updatePrevAddress(idx, e.target.value)}
                    placeholder={`Previous address ${idx + 1}`}
                    className={inputClass}
                  />
                  {prevAddresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePrevAddress(idx)}
                      className="text-gray-500 hover:text-red-400 text-xl px-2 transition-colors flex-shrink-0"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {prevAddresses.length < 5 && (
                <button
                  type="button"
                  onClick={addPrevAddress}
                  className="text-[#d4a017] text-sm hover:underline mt-1"
                >
                  + Add another address
                </button>
              )}
              <p className="text-gray-500 text-xs mt-2">Data brokers build profiles by linking your records across every address you have ever lived at. Including previous addresses ensures your information is removed from all associated records — not just your current location.</p>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4a017] hover:bg-[#b8860b] disabled:opacity-60 text-[#0a1628] font-bold py-4 rounded-full text-base transition-colors"
              >
                {loading ? 'Redirecting to checkout...' : 'Get My Privacy Shield Guide — $39'}
              </button>
              <p className="text-gray-600 text-xs text-center mt-3">
                Secure payment via Stripe. One-time purchase. Delivered instantly by email.
              </p>
            </div>
          </form>
        </div>

        {/* Trust signals */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            By LegacyShield Pro — Washington DC&apos;s family protection platform
          </p>
          <Link href="/" className="text-gray-600 hover:text-gray-400 text-sm mt-2 inline-block transition-colors">
            ← Back to LegacyShield Pro
          </Link>
        </div>
      </div>
    </div>
  );
}
