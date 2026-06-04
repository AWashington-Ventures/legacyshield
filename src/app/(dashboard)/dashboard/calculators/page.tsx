'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CalculatorsPage() {
  const [income, setIncome] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [otherDebt, setOtherDebt] = useState('');
  const [children, setChildren] = useState('');
  const [existing, setExisting] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const inc = parseFloat(income) || 0;
    const mort = parseFloat(mortgage) || 0;
    const debt = parseFloat(otherDebt) || 0;
    const kids = parseInt(children) || 0;
    const exist = parseFloat(existing) || 0;

    const incomeReplacement = inc * 10;
    const debtCoverage = mort + debt;
    const childExpenses = kids * 50000;
    const finalExpenses = 15000;
    const total = incomeReplacement + debtCoverage + childExpenses + finalExpenses - exist;
    setResult(Math.max(total, 0));
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard" className="text-[#d4a017] text-sm font-medium hover:underline">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-[#0a1628] mt-3 mb-2">Life Insurance Calculator</h1>
        <p className="text-gray-500">Find out exactly how much life insurance coverage your family needs.</p>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-[#0a1628] mb-5">📊 Coverage Needs Calculator</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Household Income ($)</label>
            <input
              type="number"
              placeholder="e.g. 75000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mortgage Balance Remaining ($)</label>
            <input
              type="number"
              placeholder="e.g. 200000"
              value={mortgage}
              onChange={(e) => setMortgage(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Other Debts (car, credit cards, etc.) ($)</label>
            <input
              type="number"
              placeholder="e.g. 25000"
              value={otherDebt}
              onChange={(e) => setOtherDebt(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Dependent Children</label>
            <input
              type="number"
              placeholder="e.g. 2"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Existing Life Insurance Coverage ($)</label>
            <input
              type="number"
              placeholder="e.g. 50000"
              value={existing}
              onChange={(e) => setExisting(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full mt-6 bg-[#0a1628] hover:bg-[#1a2a48] text-white font-bold py-4 rounded-full transition-colors"
        >
          Calculate My Coverage Needs →
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-[#0a1628] rounded-2xl p-6 mb-6 text-white">
          <div className="text-[#d4a017] text-sm font-bold uppercase tracking-widest mb-2">Your Coverage Recommendation</div>
          <div className="text-4xl font-bold mb-2">{fmt(result)}</div>
          <p className="text-white/70 text-sm">
            Based on the 10x income rule, your debts, dependent children, and final expenses — minus your current coverage.
          </p>
          <a
            href="https://www.policygenius.com/life-insurance/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Get a Free Quote → PolicyGenius
          </a>
        </div>
      )}

      {/* Guides Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-[#0a1628] mb-4">📖 Life Insurance Guides</h2>
        <div className="space-y-3">
          {[
            { title: 'Term vs. Whole Life Insurance — What DC Families Need to Know', href: '/dashboard/courses/life-insurance-101' },
            { title: 'How Much Life Insurance Do You Really Need?', href: '/dashboard/courses/life-insurance-101' },
            { title: 'How to Stop Overpaying on Life Insurance', href: '/dashboard/courses/life-insurance-101' },
            { title: 'Naming Your Beneficiaries the Right Way', href: '/dashboard/courses/estate-planning-basics' },
          ].map((guide, i) => (
            <Link key={i} href={guide.href}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#d4a017]/30 hover:bg-yellow-50/30 transition-all group">
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#0a1628]">{guide.title}</span>
              <span className="text-[#d4a017] font-bold ml-3">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
        <p className="text-blue-800 font-semibold text-sm mb-1">Ready to get insured?</p>
        <p className="text-blue-600 text-sm mb-3">Compare top-rated life insurance policies from 30+ companies in minutes.</p>
        <a
          href="https://www.policygenius.com/life-insurance/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Compare Policies — Free →
        </a>
      </div>
    </div>
  );
}
