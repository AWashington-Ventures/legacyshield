'use client';

import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="text-[#d4a017] text-sm font-medium hover:underline">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-[#0a1628] mt-3 mb-2">Private Community</h1>
        <p className="text-gray-500">Connect with other LegacyShield Pro members on your financial legacy journey.</p>
      </div>

      {/* Facebook Group CTA */}
      <div className="bg-[#0a1628] rounded-2xl p-8 mb-6 text-white">
        <div className="text-[#d4a017] text-xs font-bold uppercase tracking-widest mb-3">Members Only</div>
        <h2 className="text-2xl font-bold mb-3">Join the LegacyShield Pro Community</h2>
        <p className="text-white/70 text-sm mb-6 leading-relaxed">
          Connect with DC families who are building generational wealth, protecting their loved ones, and taking control of their financial future. Ask questions, share wins, and get support from Anthony and fellow members.
        </p>
        <a
          href="https://www.facebook.com/profile.php?id=61590401724611"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#1565d8] text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Join the Facebook Group →
        </a>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-[#0a1628] mb-4">📋 Community Guidelines</h3>
        <div className="space-y-3">
          {[
            { icon: '🤝', text: 'Be respectful and supportive of all members on their financial journey.' },
            { icon: '🔒', text: 'Keep personal financial information private — never share account details publicly.' },
            { icon: '📚', text: 'Share what you learn — your experience can help another family.' },
            { icon: '🚫', text: 'No spam, solicitation, or self-promotion without Anthony\'s approval.' },
            { icon: '✅', text: 'Ask questions freely — there are no dumb questions about protecting your family.' },
          ].map((g, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xl">{g.icon}</span>
              <p className="text-gray-600 text-sm pt-0.5">{g.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What to Expect */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-[#0a1628] mb-4">✨ What You Get in the Community</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '💬', title: 'Q&A with Anthony', desc: 'Ask questions directly and get real answers from a 30-year law enforcement veteran and financial educator.' },
            { icon: '🏆', title: 'Member Wins', desc: 'Celebrate milestones — getting insured, completing a will, starting a trust, or hitting a savings goal.' },
            { icon: '📢', title: 'Exclusive Updates', desc: 'Be the first to hear about new courses, workshops, and community events.' },
            { icon: '👥', title: 'Accountability Partners', desc: 'Find others who share your goals and keep each other on track.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-bold text-[#0a1628] text-sm mb-1">{item.title}</h4>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Workshop Reminder */}
      <div className="bg-[#d4a017]/10 border border-[#d4a017]/30 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="font-bold text-[#0a1628] text-sm">📅 Monthly Community Workshop</p>
          <p className="text-gray-500 text-xs">Live sessions every month — estate planning deep dives, Q&amp;A, and member spotlights.</p>
        </div>
        <Link
          href="/dashboard/workshops"
          className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold px-5 py-2.5 rounded-full text-sm transition-colors whitespace-nowrap"
        >
          View Workshops →
        </Link>
      </div>
    </div>
  );
}
