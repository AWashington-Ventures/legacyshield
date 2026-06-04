import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: '🏠 Home', short: 'Home', exact: true },
  { href: '/dashboard/courses', label: '📚 Courses', short: 'Courses' },
  { href: '/dashboard/workshops', label: '🤝 Workshops', short: 'Workshops' },
  { href: '/dashboard/account', label: '⚙️ Account', short: 'Account' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Check subscription status directly from MongoDB (not JWT) to catch post-payment updates
  await connectDB();
  const userId = (session.user as any)?.id;
  const dbUser = userId ? await User.findById(userId).select('subscriptionStatus').lean() : null;
  const subscriptionStatus = (dbUser as any)?.subscriptionStatus || (session.user as any)?.subscriptionStatus;
  if (subscriptionStatus !== 'active') redirect('/subscribe');

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      {/* Desktop Sidebar — hidden on mobile */}
      <aside className="hidden md:flex w-64 bg-[#0a1628] min-h-screen flex-col fixed left-0 top-0 z-30">
        {/* Logo */}
        <div className="p-6 border-b border-[#1a3a5c]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#d4a017] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#0a1628] font-bold">L</span>
            </div>
            <span className="text-white font-bold text-base tracking-tight whitespace-nowrap">LegacyShield Pro</span>
          </Link>
        </div>
        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-[#1a3a5c] transition-colors text-sm font-medium">
              {item.label}
            </Link>
          ))}
        </nav>
        {/* User + Logout */}
        <div className="p-4 border-t border-[#1a3a5c]">
          <div className="px-4 py-3 mb-2">
            <p className="text-white text-sm font-medium truncate">{session.user?.name}</p>
            <p className="text-gray-400 text-xs truncate">{session.user?.email}</p>
          </div>
          <Link href="/api/auth/signout"
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors text-sm rounded-xl hover:bg-red-900/20">
            🚪 Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile Top Bar — visible only on mobile */}
      <header className="md:hidden bg-[#0a1628] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#d4a017] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-[#0a1628] font-bold text-sm">L</span>
          </div>
          <span className="text-white font-bold text-sm tracking-tight">LegacyShield Pro</span>
        </Link>
        <span className="text-gray-400 text-xs truncate max-w-[140px]">{session.user?.name}</span>
      </header>

      {/* Main Content */}
      <div className="md:ml-64">
        <main className="p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation — visible only on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a1628] border-t border-[#1a3a5c] z-30">
        <div className="grid grid-cols-5 items-center">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center py-3 px-1 text-gray-400 hover:text-[#d4a017] transition-colors"
            >
              <span className="text-lg leading-none">{item.label.split(' ')[0]}</span>
              <span className="text-[10px] mt-1 font-medium">{item.short}</span>
            </Link>
          ))}
          <Link
            href="/api/auth/signout"
            className="flex flex-col items-center justify-center py-3 px-1 text-gray-400 hover:text-red-400 transition-colors"
          >
            <span className="text-lg leading-none">🚪</span>
            <span className="text-[10px] mt-1 font-medium">Sign Out</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
