'use client';

import { useState } from 'react';

const workshops = [
  {
    id: 'estate-planning-workshop',
    icon: '📋',
    title: 'Estate Planning Essentials',
    date: 'Saturday, June 14, 2026',
    time: '10:00 AM – 1:00 PM ET',
    format: 'Live Virtual',
    price: '$149',
    seats: 12,
    seatsLeft: 7,
    description: 'A hands-on, 3-hour live workshop covering wills, trusts, beneficiary designations, and power of attorney. Walk away with an actionable estate planning checklist tailored to your family.',
    topics: [
      'How to create a legally valid will',
      'Revocable vs. irrevocable trusts',
      'Beneficiary designations that protect your family',
      'Power of attorney — what it covers and what it doesn\'t',
      'Q&A with Anthony Washington',
    ],
    available: true,
  },
  {
    id: 'life-insurance-workshop',
    icon: '🛡️',
    title: 'Life Insurance Masterclass',
    date: 'Saturday, June 28, 2026',
    time: '11:00 AM – 1:00 PM ET',
    format: 'Live Virtual',
    price: '$149',
    seats: 15,
    seatsLeft: 10,
    description: 'Stop overpaying for the wrong coverage. This 2-hour live workshop breaks down every type of life insurance, how to compare policies, and how much your family actually needs.',
    topics: [
      'Term vs. Whole vs. Universal Life',
      'How insurers calculate your premium',
      'How much coverage your family actually needs',
      'Red flags in life insurance contracts',
      'Live policy comparison walkthrough',
    ],
    available: true,
  },
  {
    id: 'homebuying-workshop',
    icon: '🏠',
    title: 'Home Buying in the DMV',
    date: 'Saturday, July 12, 2026',
    time: '10:00 AM – 12:30 PM ET',
    format: 'Live Virtual',
    price: '$149',
    seats: 20,
    seatsLeft: 20,
    description: 'A complete guide to buying your first home in Washington DC, Maryland, and Virginia. Learn about down payment assistance programs, FHA loans, and how to build equity from day one.',
    topics: [
      'DC Home Purchase Assistance Program (HPAP)',
      'FHA, VA, and conventional loans compared',
      'How to read a closing disclosure',
      'Negotiation strategies in the DMV market',
      'Building equity from day one',
    ],
    available: true,
  },
  {
    id: 'generational-wealth-workshop',
    icon: '💰',
    title: 'Building Generational Wealth',
    date: 'Coming Soon',
    time: '',
    format: 'Live Virtual',
    price: '$149',
    seats: 0,
    seatsLeft: 0,
    description: 'A deep-dive workshop on index funds, retirement accounts, real estate investing, and teaching your children about money — all built for DMV working families.',
    topics: [
      'Index funds for beginners',
      'Maxing out your retirement accounts',
      'Real estate investment basics',
      'Custodial Roth IRAs for your children',
      'Your 5-year family wealth plan',
    ],
    available: false,
  },
  {
    id: 'credit-repair-workshop',
    icon: '🏦',
    title: 'Credit Repair & Banking Foundations',
    date: 'Coming Soon',
    time: '',
    format: 'Live Virtual',
    price: '$149',
    seats: 0,
    seatsLeft: 0,
    description: 'Fix your credit score, eliminate predatory debt, and build a banking foundation that works for your family. Practical strategies you can implement this week.',
    topics: [
      'How to dispute credit report errors',
      'Fastest legal credit score strategies',
      'Debt payoff: avalanche vs. snowball',
      'Choosing the right bank accounts',
      'Building your 12-month credit action plan',
    ],
    available: false,
  },
];

export default function WorkshopsPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleRegister = async (workshopId: string) => {
    setError('');
    setLoading(workshopId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'workshop', workshopId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Unable to process registration. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a1628] mb-2">Live Workshops</h1>
        <p className="text-gray-500">Hands-on, live sessions with Anthony Washington. Small groups. Real answers. Real results.</p>
      </div>

      {/* Banner */}
      <div className="bg-[#0a1628] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-[#d4a017] font-bold text-sm uppercase tracking-wide mb-1">LegacyShield Pro Members Save</p>
          <h2 className="text-white text-xl font-bold">All workshops included with your membership</h2>
          <p className="text-gray-400 text-sm mt-1">Your $39/month membership includes full access to all live workshops. No extra charge.</p>
        </div>
        <div className="text-4xl">🤝</div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {workshops.map((workshop, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition-all ${
              workshop.available
                ? 'border-gray-100 hover:border-[#d4a017]/40 hover:shadow-md'
                : 'border-gray-100 opacity-70'
            }`}
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="text-4xl">{workshop.icon}</div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    workshop.available ? 'bg-[#d4a017]/10 text-[#b8860b]' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {workshop.available ? 'Included with Membership' : 'Coming Soon'}
                  </span>
                  {workshop.available && workshop.seatsLeft <= 5 && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-600">
                      🔥 {workshop.seatsLeft} seats left
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-[#0a1628] text-lg mb-2">{workshop.title}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{workshop.description}</p>

              {workshop.available && (
                <div className="flex flex-col gap-1 text-xs text-gray-500 mb-4">
                  <span>📅 {workshop.date}</span>
                  {workshop.time && <span>⏰ {workshop.time}</span>}
                  <span>💻 {workshop.format}</span>
                  <span>👥 {workshop.seats} person max — intimate & interactive</span>
                </div>
              )}

              <ul className="space-y-1.5">
                {workshop.topics.slice(0, 3).map((topic, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-[#d4a017] font-bold text-xs">▸</span> {topic}
                  </li>
                ))}
                {workshop.topics.length > 3 && (
                  <li className="text-xs text-gray-400 pl-4">+ {workshop.topics.length - 3} more topics</li>
                )}
              </ul>
            </div>

            <div className="px-6 pb-6">
              {workshop.available ? (
                <button
                  className="w-full bg-[#0a1628] hover:bg-[#1a3a5c] text-white font-semibold py-3 rounded-full text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={() => handleRegister(workshop.id)}
                  disabled={loading === workshop.id}
                >
                  {loading === workshop.id ? (
                    <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Processing...</>
                  ) : (
                    'Reserve Your Seat →'
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-400 font-semibold py-3 rounded-full text-sm cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 rounded-2xl p-6 text-center">
        <p className="text-[#0a1628] font-semibold mb-1">Want a workshop for your organization or community group?</p>
        <p className="text-gray-500 text-sm">Anthony Washington offers group sessions for churches, civic organizations, and employers across the DMV.</p>
        <a
          href="mailto:ahwashington@legacyshieldpro.com"
          className="inline-block mt-4 bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-semibold px-8 py-3 rounded-full text-sm transition-colors"
        >
          Contact Us for Group Pricing
        </a>
      </div>
    </div>
  );
}
