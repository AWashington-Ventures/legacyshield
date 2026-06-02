import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const dynamic = 'force-dynamic';



export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      plan: 'community',
      subscriptionStatus: 'inactive',
      // Start lead nurture sequence immediately on signup
      leadNurtureStartedAt: new Date(),
    });

    // Send welcome email via Resend
    try {
      await resend.emails.send({
        from: 'Darcia | Chief of Staff <darcia@legacyshieldpro.com>',
        reply_to: 'Anthony Washington <ahwashington@legacyshieldpro.com>',
        to: email.toLowerCase().trim(),
        subject: 'Welcome to LegacyShield Pro — Your Family\'s Protection Starts Now',
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="https://legacyshieldpro.com/images/logo.png" alt="LegacyShield Pro" style="height: 48px;" />
            </div>
            <h1 style="color: #d4af37; font-size: 28px; margin-bottom: 8px;">Welcome, ${name.trim()}!</h1>
            <p style="color: #cccccc; font-size: 16px; line-height: 1.6;">
              I'm Darcia Sterling, Chief of Staff here at LegacyShield Pro. On behalf of Anthony Washington and our entire team — welcome to the family.
            </p>
            <p style="color: #cccccc; font-size: 16px; line-height: 1.6;">
              You've just taken one of the most important steps you can take for the people you love. LegacyShield Pro exists to make sure your family never has to scramble, guess, or fight — because you had a plan.
            </p>
            <div style="background: #1a1a1a; border-left: 4px solid #d4af37; padding: 20px; margin: 24px 0; border-radius: 4px;">
              <p style="color: #ffffff; font-size: 16px; margin: 0 0 12px;"><strong>Your next steps:</strong></p>
              <ol style="color: #cccccc; font-size: 15px; line-height: 2;">
                <li>Log in to your dashboard at <a href="https://legacyshieldpro.com/dashboard" style="color: #d4af37;">legacyshieldpro.com/dashboard</a></li>
                <li>Start with <strong>Life Insurance 101</strong> — it takes less than 20 minutes</li>
                <li>Download your free <strong>Family Protection Assessment</strong> from the Banking & Credit course</li>
                <li>Register for an upcoming live workshop with Anthony</li>
              </ol>
            </div>
            <p style="color: #cccccc; font-size: 16px; line-height: 1.6;">
              If you have any questions, reply to this email and Anthony or I will personally get back to you.
            </p>
            <p style="color: #cccccc; font-size: 16px; margin-top: 32px;">
              With purpose,<br/>
              <strong style="color: #d4af37;">Darcia Sterling</strong><br/>
              Chief of Staff to Anthony Washington<br/>
              LegacyShield Pro
            </p>
            <div style="border-top: 1px solid #333; margin-top: 40px; padding-top: 20px; text-align: center;">
              <p style="color: #666; font-size: 12px;">
                LegacyShield Pro | Washington DC Metro Area<br/>
                <a href="https://legacyshieldpro.com" style="color: #d4af37;">legacyshieldpro.com</a> |
                <a href="https://legacyshieldpro.com/privacy-policy" style="color: #666;">Privacy Policy</a> |
                <a href="https://legacyshieldpro.com/terms" style="color: #666;">Terms of Service</a>
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      // Don't fail signup if email fails — just log it
      console.error('[signup] Welcome email failed:', emailErr);
    }

    return NextResponse.json({ message: 'Account created successfully' }, { status: 201 });
  } catch (err) {
    console.error('[signup]', err);
    const message = err instanceof Error ? err.message : 'Unknown server error';
    console.error('[signup] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
