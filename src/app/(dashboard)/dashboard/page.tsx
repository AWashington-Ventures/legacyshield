'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const courses = [
  {
    courseId: 'life-insurance-101',
    title: 'Life Insurance 101',
    icon: '🛡️',
    lessons: 6,
    description: 'Learn what you need, what to avoid, and how to stop overpaying.',
    href: '/dashboard/courses/life-insurance-101',
  },
  {
    courseId: 'estate-planning-basics',
    title: 'Estate Planning Basics',
    icon: '📋',
    lessons: 5,
    description: 'Wills, trusts, beneficiaries — explained simply.',
    href: '/dashboard/courses/estate-planning-basics',
  },
  {
    courseId: 'generational-wealth-playbook',
    title: 'Generational Wealth Playbook',
    icon: '💰',
    lessons: 8,
    description: 'Real strategies for DC working families.',
    href: '/dashboard/courses/generational-wealth-playbook',
  },
  {
    courseId: 'protecting-your-family',
    title: 'Protecting Your Family',
    icon: '🏠',
    lessons: 4,
    description: 'Power of attorney, guardianship, and family protection planning.',
    href: '/dashboard/courses/protecting-your-family',
  },
];

interface CompletedLesson {
  courseId: string;
  lessonId: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [completedLessons, setCompletedLessons] = useState<CompletedLesson[]>([]);
  const [liveStatus, setLiveStatus] = useState<{ subscriptionStatus?: string; plan?: string } | null>(null);

  const firstName = session?.user?.name?.split(' ')[0] ?? 'Member';
  // Use live DB status if available, fall back to JWT session
  const subscriptionStatus = liveStatus?.subscriptionStatus ?? (session?.user as any)?.subscriptionStatus;
  const plan = liveStatus?.plan ?? (session?.user as any)?.plan;
  const isActive = subscriptionStatus === 'active';

  useEffect(() => {
    fetch('/api/progress')
      .then((r) => r.json())
      .then((data) => setCompletedLessons(data.completedLessons ?? []))
      .catch(() => {});
    // Fetch live subscription status from DB to avoid stale JWT data
    fetch('/api/user/status')
      .then((r) => r.json())
      .then((data) => setLiveStatus(data))
      .catch(() => {});
  }, []);

  const getCompleted = (courseId: string) =>
    completedLessons.filter((l) => l.courseId === courseId).length;

  const totalCompleted = completedLessons.length;

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a1628] mb-2">Welcome back, {firstName} 👋</h1>
        <p className="text-gray-500">Your family&apos;s financial future starts here. Keep building.</p>
      </div>

      {/* Welcome Video Greeting */}
      <div className="bg-[#0a1628] rounded-2xl overflow-hidden mb-8 border border-white/10">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="flex-shrink-0 w-full md:w-64">
            <video
              controls
              preload="auto"
              poster="/darcia-sterling-avatar-thumb.jpg"
              className="w-full rounded-xl shadow-lg"
            >
              <source src="/api/video/darcia-intro" type="video/mp4" />
            </video>
          </div>
          <div className="text-white">
            <div className="inline-block bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
              Welcome Message
            </div>
            <h3 className="text-xl font-bold mb-2">A message from Darcia Sterling</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Chief of Staff to Anthony Washington. Watch this quick welcome to get oriented and know exactly how LegacyShield Pro will protect your family&apos;s future.
            </p>
          </div>
        </div>
      </div>

      {/* Active subscription banner */}
      {isActive && (
        <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 mb-8 flex items-center gap-3">
          <span className="text-green-500 text-xl">✅</span>
          <div>
            <p className="text-green-800 font-semibold text-sm">Active Member — {plan === 'legacy_builder' ? 'Legacy Builder' : 'Community'} Plan</p>
            <p className="text-green-600 text-xs">You have full access to all courses and resources.</p>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Courses Available', value: '6', icon: '📚' },
          { label: 'Lessons Completed', value: String(totalCompleted), icon: '✅' },
          { label: 'Next Workshop', value: 'Jun 7', icon: '🤝' },
          { label: 'Your Plan', value: isActive ? (plan === 'legacy_builder' ? 'Legacy Builder' : 'Community') : 'Free', icon: '🌟' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-[#0a1628] mb-1">{stat.value}</div>
            <div className="text-gray-500 text-xs font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Start Here Banner — Dynamic */}
      {(() => {
        const nextCourse = courses.find(c => c.courseId && getCompleted(c.courseId) < c.lessons);
        const allDone = courses.filter(c => c.courseId).every(c => getCompleted(c.courseId!) >= c.lessons);
        if (allDone) {
          return (
            <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-green-200 text-xs font-bold uppercase tracking-widest mb-2">🏆 All Courses Complete!</div>
                <h2 className="text-2xl font-bold text-white mb-2">You&apos;ve finished all LegacyShield Pro courses!</h2>
                <p className="text-green-100 text-sm max-w-lg">Your family is better protected because of the work you put in. Explore your resources or book your 1:1 Legacy Planning Session.</p>
              </div>
              <Link href="/dashboard/account"
                className="bg-white hover:bg-green-50 text-green-700 font-bold px-8 py-4 rounded-full text-sm transition-colors whitespace-nowrap flex-shrink-0">
                View My Benefits →
              </Link>
            </div>
          );
        }
        if (nextCourse) {
          return (
            <div className="bg-[#0a1628] rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-[#d4a017] text-xs font-bold uppercase tracking-widest mb-2">Continue Learning</div>
                <h2 className="text-2xl font-bold text-white mb-2">{nextCourse.title}</h2>
                <p className="text-gray-300 text-sm max-w-lg">{nextCourse.description}</p>
              </div>
              <Link href={nextCourse.href}
                className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold px-8 py-4 rounded-full text-sm transition-colors whitespace-nowrap flex-shrink-0">
                Continue →
              </Link>
            </div>
          );
        }
        return (
          <div className="bg-[#0a1628] rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-[#d4a017] text-xs font-bold uppercase tracking-widest mb-2">Recommended First Step</div>
              <h2 className="text-2xl font-bold text-white mb-2">Start with Life Insurance 101</h2>
              <p className="text-gray-300 text-sm max-w-lg">56% of DC families are underinsured. This course teaches you exactly how much coverage you need — in under 45 minutes.</p>
            </div>
            <Link href="/dashboard/courses"
              className="bg-[#d4a017] hover:bg-[#b8860b] text-[#0a1628] font-bold px-8 py-4 rounded-full text-sm transition-colors whitespace-nowrap flex-shrink-0">
              Start Learning →
            </Link>
          </div>
        );
      })()}

      {/* Member Resources */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#0a1628]">Member Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/calculators"
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#d4a017]/30 transition-all group">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-[#0a1628] group-hover:text-[#d4a017] transition-colors mb-1">Life Insurance Calculator</h3>
            <p className="text-gray-500 text-sm">Calculate exactly how much coverage your family needs.</p>
            <span className="text-[#d4a017] text-sm font-semibold mt-3 inline-block">Calculate Now →</span>
          </Link>
          <Link href="/dashboard/templates"
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#d4a017]/30 transition-all group">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-bold text-[#0a1628] group-hover:text-[#d4a017] transition-colors mb-1">Estate Planning Templates</h3>
            <p className="text-gray-500 text-sm">Free checklists, trackers, and worksheets for your family.</p>
            <span className="text-[#d4a017] text-sm font-semibold mt-3 inline-block">View Templates →</span>
          </Link>
          <Link href="/dashboard/community"
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#d4a017]/30 transition-all group">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-bold text-[#0a1628] group-hover:text-[#d4a017] transition-colors mb-1">Private Community</h3>
            <p className="text-gray-500 text-sm">Connect with DC families on the same legacy-building journey.</p>
            <span className="text-[#d4a017] text-sm font-semibold mt-3 inline-block">Join Community →</span>
          </Link>
        </div>
      </div>

      {/* Course Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#0a1628]">Your Courses</h2>
          <Link href="/dashboard/courses" className="text-[#d4a017] hover:text-[#b8860b] text-sm font-medium">View all →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {courses.map((course, idx) => {
            const completed = course.courseId ? getCompleted(course.courseId) : 0;
            const isCourseDone = course.courseId !== null && completed === course.lessons;
            const pct = Math.round((completed / course.lessons) * 100);

            return (
              <Link key={idx} href={course.href}
                className={`bg-white rounded-2xl border p-6 hover:shadow-md transition-all group ${
                  isCourseDone ? 'border-green-200' : completed > 0 ? 'border-[#d4a017]/30' : 'border-gray-100 hover:border-[#d4a017]/30'
                }`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{course.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#0a1628] group-hover:text-[#d4a017] transition-colors">{course.title}</h3>
                      {isCourseDone && <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✅ Done</span>}
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{course.lessons} lessons</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              isCourseDone ? 'bg-green-500' : 'bg-[#d4a017]'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{completed}/{course.lessons}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
