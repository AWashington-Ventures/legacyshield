import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = (session.user as any)?.id;
    if (!userId) return NextResponse.json({ error: 'No user ID' }, { status: 400 });

    await connectDB();
    const user = await User.findById(userId).select('subscriptionStatus plan').lean();

    return NextResponse.json({
      subscriptionStatus: (user as any)?.subscriptionStatus ?? 'inactive',
      plan: (user as any)?.plan ?? 'community',
    });
  } catch (err) {
    console.error('[api/user/status]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
