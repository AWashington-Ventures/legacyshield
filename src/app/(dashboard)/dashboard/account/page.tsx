'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface CompletedLesson {
  courseId: string;
  lessonId: number;
}

export default function AccountPage() {
  const { data: session } = useSession();
  const [completedLessons, setCompletedLessons] = useState<CompletedLesson[]>([]);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [portalError, setPortalError] = useState('');

  const name = session?.user?.name ?? 'Member';
  const email = session?.user?.email ?? '';
  const subscriptionStatus = (session?.user as any)?.subscriptionStatus;
  const plan = (session?.user as any)?.plan;
  const isActive = subscriptionStatus === 'active';

  const planLabel: Record<string, string> = {
    community: 'Community — $39/month',
    legacy_builder: 'Legacy Builder — $99/month',
    workshop: 'Workshop Pass',
  };

  useEffect(() => {
    fetch('/api/progress')
      .then((r) => r.json())
      .then((data) => setCompletedLessons(data.completedLessons ?? []))
      .catch(() => {});
  }, []);

  const totalCompleted = completedLessons.length;
  const uniqueCourses = new Set(completedLessons.map((l) => l.courseId)).size;

  const handleBillingPortal = async () => {
    setLoadingPortal(true);
    setPortalError('');
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setPortalError('Could not open billing portal. Please contact support.');
      }
    } catch {
      setPortalError('Something went wrong. Please try again.');
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a1628] mb-2">My Account</h1>
        <p className="text-gray-500">Manage your profile, subscription, and membership details.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-[#0a1628] mb-4">👤 Profile</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-2xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-[#0a1628] text-lg">{name}</p>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Member Since</span>
            <span className="font-medium text-[#0a1628]">2026</span>
          </div>
          <div className="flex justify-between">
            <span>Lessons Completed</span>
            <span className="font-medium text-[#0a1628]">{totalCompleted}</span>
          </div>
          <div className="flex justify-between">
            <span>Courses Active</span>
            <span className="font-medium text-[#0a1628]">{uniqueCourses}</span>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-[#0a1628] mb-4">💳 Subscription</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold text-[#0a1628]">
              {plan ? planLabel[plan] ?? plan : 'LegacyShield Pro'}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">Full course library + live workshops</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
            isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
          }`}>
            {isActive ? '✅ Active' : '⚠️ Inactive'}
          </span>
        </div>

        {isActive && (
          <div className="bg-[#f8f6f0] rounded-xl p-4 mb-4">
            <p className="text-sm text-[#0a1628] font-medium mb-1">🎓 What&apos;s included:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>▸ Full course library (6 courses)</li>
              <li>▸ All live workshops included</li>
              <li>▸ Community access</li>
              <li>▸ New content added monthly</li>
            </ul>
          </div>
        )}

        {portalError && (
          <p className="text-red-500 text-sm mb-3">{portalError}</p>
        )}

        <button
          onClick={handleBillingPortal}
          disabled={loadingPortal}
          className="w-full bg-[#0a1628] hover:bg-[#1a3a5c] disabled:bg-gray-300 text-white font-semibold py-3 rounded-full text-sm transition-colors"
        >
          {loadingPortal ? 'Loading...' : '⚙️ Manage Billing & Subscription'}
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">Update payment method, download invoices, or cancel</p>
      </div>

      {/* Legacy Builder Exclusive Benefits */}
      {plan === 'legacy_builder' && (
        <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#d4a017] text-lg">👑</span>
            <h2 className="text-lg font-bold text-white">Legacy Builder Benefits</h2>
          </div>
          <p className="text-gray-300 text-sm mb-5">Your exclusive premium benefits — included with your Legacy Builder membership.</p>

          <div className="space-y-3">
            {/* Attorney Consult */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">⚖️ Quarterly Attorney Consult</p>
                  <p className="text-gray-300 text-xs mt-0.5">4 sessions/year · Estate planning & legal questions</p>
                </div>
                <a
                  href={`mailto:ahwashington@legacyshieldpro.com?subject=Attorney Consult Request&body=Hi, I'd like to schedule my quarterly attorney consultation. My name is ${name} (${email}).`}
                  className="ml-3 bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  Schedule →
                </a>
              </div>
            </div>

            {/* 1:1 Legacy Planning */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">🛡️ 1:1 Legacy Planning Session</p>
                  <p className="text-gray-300 text-xs mt-0.5">1 session/year · Personalized with Anthony Washington</p>
                </div>
                <a
                  href={`mailto:ahwashington@legacyshieldpro.com?subject=1:1 Legacy Planning Session Request&body=Hi Anthony, I'd like to schedule my annual 1:1 Legacy Planning Session. My name is ${name} (${email}).`}
                  className="ml-3 bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  Book →
                </a>
              </div>
            </div>

            {/* Insurance Review */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">💊 Insurance Policy Review</p>
                  <p className="text-gray-300 text-xs mt-0.5">Annual review · Make sure your coverage is right</p>
                </div>
                <a
                  href={`mailto:ahwashington@legacyshieldpro.com?subject=Insurance Policy Review Request&body=Hi, I'd like to schedule my annual insurance policy review. My name is ${name} (${email}).`}
                  className="ml-3 bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  Request →
                </a>
              </div>
            </div>

            {/* Priority Workshop Seating */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">🎟️ Priority Workshop Seating</p>
                  <p className="text-gray-300 text-xs mt-0.5">Reserved front-row access to all live workshops</p>
                </div>
                <a
                  href="/dashboard/workshops"
                  className="ml-3 bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  View →
                </a>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-xs text-center mt-4">Questions? Email ahwashington@legacyshieldpro.com</p>
        </div>
      )}

      {/* Support Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-[#0a1628] mb-4">🤝 Support</h2>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:ahwashington@legacyshieldpro.com"
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-[#0a1628]">📧 Email Support</span>
            <span className="text-xs text-gray-400">ahwashington@legacyshieldpro.com</span>
          </a>
          <a
            href="https://legacyshieldpro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-[#0a1628]">🌐 LegacyShield Pro Website</span>
            <span className="text-xs text-gray-400">legacyshieldpro.com →</span>
          </a>
        </div>
      </div>

      {/* Sign Out */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600 font-semibold py-3 rounded-full text-sm transition-colors"
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}
