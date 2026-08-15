import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/mongodb';
import PrivacyGuideOrder from '@/models/PrivacyGuideOrder';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, dob, currentAddress, previousAddresses } = body;

    if (!firstName || !lastName || !email || !dob || !currentAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    // Store order data before sending to Stripe
    const order = await PrivacyGuideOrder.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      dob: dob.trim(),
      currentAddress: currentAddress.trim(),
      previousAddresses: Array.isArray(previousAddresses)
        ? previousAddresses.filter((a: string) => a.trim())
        : [],
      status: 'pending_payment',
    });

    const baseUrl = process.env.NEXTAUTH_URL || 'https://legacyshieldpro.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email.trim().toLowerCase(),
      metadata: {
        type: 'privacy_guide',
        orderId: order._id.toString(),
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Privacy Shield Guide',
              description:
                'Personalized step-by-step guide to remove your information from 18 major data broker websites. Delivered instantly by email.',
            },
            unit_amount: 2900, // $29.00
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/privacy-guide/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/privacy-guide?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[privacy-guide/checkout]', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
