'use client';

import { useState } from 'react';

const NEEDS_CATEGORIES = [
  'Rent / Mortgage',
  'Utilities (Electric, Gas, Water)',
  'Groceries',
  'Health Insurance',
  'Car Payment',
  'Car Insurance',
  'Minimum Debt Payments',
  'Childcare / School',
  'Life Insurance',
  'Other Needs',
];

const WANTS_CATEGORIES = [
  'Dining Out / Takeout',
  'Streaming Services',
  'Clothing & Shopping',
  'Entertainment / Events',
  'Gym / Fitness',
  'Hobbies',
  'Personal Care / Salon',
  'Subscriptions',
  'Travel / Vacations',
  'Other Wants',
];

const SAVINGS_CATEGORIES = [
  'Emergency Fund',
  'Retirement (401k/IRA)',
  'Investments',
  'Life Insurance (Savings)',
  'Estate Planning Fund',
  'College / Education Fund',
  'Other Savings',
];

type ExpenseMap = { [key: string]: string };

export default function WorksheetsPage() {
  const [income, setIncome] = useState('');
  const [needs, setNeeds] = useState<ExpenseMap>({});
  const [wants, setWants] = useState<ExpenseMap>({});
  const [savings, setSavings] = useState<ExpenseMap>({});
  const [wantToCut, setWantToCut] = useState('');

  const toNum = (v: string) => parseFloat(v) || 0;
  const incomeNum = toNum(income);

  const needsTotal = NEEDS_CATEGORIES.reduce((s, k) => s + toNum(needs[k] || ''), 0);
  const wantsTotal = WANTS_CATEGORIES.reduce((s, k) => s + toNum(wants[k] || ''), 0);
  const savingsTotal = SAVINGS_CATEGORIES.reduce((s, k) => s + toNum(savings[k] || ''), 0);
  const totalExpenses = needsTotal + wantsTotal + savingsTotal;

  const pct = (v: number) => incomeNum > 0 ? ((v / incomeNum) * 100).toFixed(1) : '0.0';

  const targetNeeds = incomeNum * 0.5;
  const targetWants = incomeNum * 0.3;
  const targetSavings = incomeNum * 0.2;

  const statusColor = (actual: number, target: number) => {
    if (!incomeNum) return 'text-gray-400';
    const ratio = actual / target;
    if (ratio <= 1.0) return 'text-green-600';
    if (ratio <= 1.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent';

  return (
    <div className="max-w-3xl mx-auto pb-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0a1628]">💰 Blueprint Budget Worksheet</h1>
        <p className="text-gray-500 text-sm mt-1">Map every dollar using the 50/30/20 rule — needs, wants, and savings.</p>
      </div>

      {/* Income Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <h2 className="text-base font-bold text-[#0a1628] mb-3">📥 Monthly After-Tax Income</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-semibold text-lg">$</span>
          <input
            type="number"
            placeholder="e.g. 4500"
            value={income}
            onChange={e => setIncome(e.target.value)}
            className={inputClass + ' text-lg font-semibold'}
          />
        </div>
      </div>

      {/* 50/30/20 Summary Card */}
      {incomeNum > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Needs', target: 50, actual: pct(needsTotal), color: 'bg-blue-50 border-blue-200', accent: 'text-blue-700' },
            { label: 'Wants', target: 30, actual: pct(wantsTotal), color: 'bg-purple-50 border-purple-200', accent: 'text-purple-700' },
            { label: 'Savings', target: 20, actual: pct(savingsTotal), color: 'bg-green-50 border-green-200', accent: 'text-green-700' },
          ].map(({ label, target, actual, color, accent }) => (
            <div key={label} className={`rounded-2xl border p-4 text-center ${color}`}>
              <p className={`text-2xl font-bold ${accent}`}>{actual}%</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
              <p className="text-xs text-gray-400">Target: {target}%</p>
            </div>
          ))}
        </div>
      )}

      {/* Needs */}
      <ExpenseSection
        title="🏠 Needs (Target: 50%)"
        subtitle={`Target: $${targetNeeds.toFixed(0)} / Actual: $${needsTotal.toFixed(0)} (${pct(needsTotal)}%)`}
        categories={NEEDS_CATEGORIES}
        values={needs}
        onChange={setNeeds}
        statusColor={statusColor(needsTotal, targetNeeds)}
        inputClass={inputClass}
      />

      {/* Wants */}
      <ExpenseSection
        title="✨ Wants (Target: 30%)"
        subtitle={`Target: $${targetWants.toFixed(0)} / Actual: $${wantsTotal.toFixed(0)} (${pct(wantsTotal)}%)`}
        categories={WANTS_CATEGORIES}
        values={wants}
        onChange={setWants}
        statusColor={statusColor(wantsTotal, targetWants)}
        inputClass={inputClass}
      />

      {/* Savings */}
      <ExpenseSection
        title="🛡️ Savings & Protection (Target: 20%)"
        subtitle={`Target: $${targetSavings.toFixed(0)} / Actual: $${savingsTotal.toFixed(0)} (${pct(savingsTotal)}%)`}
        categories={SAVINGS_CATEGORIES}
        values={savings}
        onChange={setSavings}
        statusColor={statusColor(savingsTotal, targetSavings)}
        inputClass={inputClass}
      />

      {/* Action Step */}
      <div className="bg-[#fffbeb] border border-[#d4a017] rounded-2xl p-5 mb-5">
        <h2 className="text-base font-bold text-[#0a1628] mb-2">🎯 Your $50 Challenge</h2>
        <p className="text-sm text-gray-600 mb-3">
          Identify ONE want you can reduce by $50 this month and redirect it to savings or debt payoff.
        </p>
        <label className="block text-sm font-medium text-gray-700 mb-1">I will reduce:</label>
        <input
          type="text"
          placeholder="e.g. Dining out — cut from $200 to $150"
          value={wantToCut}
          onChange={e => setWantToCut(e.target.value)}
          className={inputClass}
        />
        {wantToCut && (
          <p className="text-sm text-green-700 mt-2 font-medium">✅ Great commitment! $50/month = $600/year towards your legacy.</p>
        )}
      </div>

      {/* Totals Summary */}
      <div className="bg-[#0a1628] rounded-2xl p-5 text-white mb-5">
        <h2 className="text-base font-bold mb-4 text-[#d4a017]">📊 Budget Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-300">Monthly Income</span><span className="font-bold">${incomeNum.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">Total Needs</span><span>${needsTotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">Total Wants</span><span>${wantsTotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">Total Savings</span><span>${savingsTotal.toFixed(2)}</span></div>
          <div className="border-t border-gray-600 pt-2 flex justify-between font-bold">
            <span>Total Expenses</span>
            <span className={incomeNum > 0 && totalExpenses > incomeNum ? 'text-red-400' : 'text-green-400'}>
              ${totalExpenses.toFixed(2)}
            </span>
          </div>
          {incomeNum > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-300">Remaining</span>
              <span className={incomeNum - totalExpenses >= 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                ${(incomeNum - totalExpenses).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="w-full py-3 bg-[#d4a017] text-white font-bold rounded-xl hover:bg-[#b8860b] transition-colors print:hidden"
      >
        🖨️ Print / Save Worksheet
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        LegacyShield Pro — Protecting Families. Building Legacies.
      </p>
    </div>
  );
}

function ExpenseSection({
  title, subtitle, categories, values, onChange, statusColor, inputClass
}: {
  title: string;
  subtitle: string;
  categories: string[];
  values: ExpenseMap;
  onChange: (v: ExpenseMap) => void;
  statusColor: string;
  inputClass: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-base font-bold text-[#0a1628]">{title}</h2>
      </div>
      <p className={`text-xs font-medium mb-4 ${statusColor}`}>{subtitle}</p>
      <div className="space-y-2">
        {categories.map(cat => (
          <div key={cat} className="flex items-center gap-3">
            <label className="text-sm text-gray-600 flex-1 min-w-0 truncate">{cat}</label>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder="0"
                value={values[cat] || ''}
                onChange={e => onChange({ ...values, [cat]: e.target.value })}
                className="w-24 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] text-right"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
