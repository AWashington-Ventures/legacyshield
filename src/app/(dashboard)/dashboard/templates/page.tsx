'use client';

import Link from 'next/link';

const templates = [
  {
    icon: '📝',
    title: 'Will Planning Checklist',
    description: 'Everything you need to gather before meeting with an attorney to create your will.',
    action: 'Download PDF',
    href: '/templates/will-planning-checklist.pdf',
    category: 'Wills',
    color: 'blue',
  },
  {
    icon: '🏦',
    title: 'Beneficiary Designation Tracker',
    description: 'Track all your accounts, policies, and beneficiary designations in one place.',
    action: 'Download PDF',
    href: '/templates/beneficiary-tracker.pdf',
    category: 'Estate Planning',
    color: 'green',
  },
  {
    icon: '⚖️',
    title: 'Power of Attorney Preparation Guide',
    description: 'What to know and what to bring when creating a financial or healthcare POA.',
    action: 'Download PDF',
    href: '/templates/poa-guide.pdf',
    category: 'Legal Documents',
    color: 'purple',
  },
  {
    icon: '💰',
    title: 'Family Financial Inventory',
    description: 'Document all assets, accounts, insurance policies, and debts your family should know about.',
    action: 'Download PDF',
    href: '/templates/family-financial-inventory.pdf',
    category: 'Estate Planning',
    color: 'yellow',
  },
  {
    icon: '🛡️',
    title: 'Life Insurance Policy Tracker',
    description: 'Record all your life insurance policies, coverage amounts, and contact information.',
    action: 'Download PDF',
    href: '/templates/insurance-policy-tracker.pdf',
    category: 'Insurance',
    color: 'red',
  },
  {
    icon: '📋',
    title: 'Blueprint Budget Worksheet',
    description: 'The LegacyShield 50/30/20 budget worksheet — allocate income, track expenses, and find savings.',
    action: 'Open Worksheet',
    href: '/dashboard/worksheets',
    category: 'Budgeting',
    color: 'teal',
    internal: true,
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-100 text-blue-700',
  green: 'bg-green-50 border-green-100 text-green-700',
  purple: 'bg-purple-50 border-purple-100 text-purple-700',
  yellow: 'bg-yellow-50 border-yellow-100 text-yellow-700',
  red: 'bg-red-50 border-red-100 text-red-700',
  teal: 'bg-teal-50 border-teal-100 text-teal-700',
};

export default function TemplatesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="text-[#d4a017] text-sm font-medium hover:underline">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-[#0a1628] mt-3 mb-2">Estate Planning Templates</h1>
        <p className="text-gray-500">Free templates and worksheets to help you protect your family&apos;s future.</p>
      </div>

      {/* Templates Grid */}
      <div className="space-y-4 mb-8">
        {templates.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{t.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-[#0a1628]">{t.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorMap[t.color]}`}>{t.category}</span>
                </div>
                <p className="text-gray-500 text-sm mb-3">{t.description}</p>
                {t.internal ? (
                  <Link
                    href={t.href}
                    className="inline-flex items-center gap-2 bg-[#0a1628] hover:bg-[#1a2a48] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                  >
                    {t.action} →
                  </Link>
                ) : (
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0a1628] hover:bg-[#1a2a48] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                  >
                    ⬇ {t.action}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Partner CTA */}
      <div className="bg-[#0a1628] rounded-2xl p-6 text-white mb-6">
        <div className="text-[#d4a017] text-xs font-bold uppercase tracking-widest mb-2">Ready to Make It Official?</div>
        <h3 className="text-xl font-bold mb-2">Create Your Legal Documents Online</h3>
        <p className="text-white/70 text-sm mb-4">
          Use Trust &amp; Will to create your will, living trust, or power of attorney — 100% online, attorney-reviewed.
        </p>
        <a
          href="https://trustandwill.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Get Started — Trust &amp; Will →
        </a>
      </div>

      {/* Course Link */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 flex items-center justify-between">
        <div>
          <p className="font-semibold text-[#0a1628] text-sm">Want to learn more first?</p>
          <p className="text-gray-500 text-xs">Take the Estate Planning Basics course before filling these out.</p>
        </div>
        <Link
          href="/dashboard/courses/estate-planning-basics"
          className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold px-5 py-2.5 rounded-full text-sm transition-colors whitespace-nowrap"
        >
          Start Course →
        </Link>
      </div>
    </div>
  );
}
