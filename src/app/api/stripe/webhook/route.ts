import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import PrivacyGuideOrder from '@/models/PrivacyGuideOrder';
import Stripe from 'stripe';
import { sendWelcomeEmail, sendPaymentFailedEmail } from '@/lib/email';
import { generatePrivacyGuide, sendPrivacyGuideEmail } from '@/lib/privacyGuide';

export const dynamic = 'force-dynamic';



export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  await connectDB();

  try {
    switch (event.type) {

      // ── Subscription activated ─────────────────────────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, plan, type, orderId } = session.metadata ?? {};

        // ── Privacy Shield Guide one-time purchase ──────────────────────────
        if (type === 'privacy_guide' && orderId) {
          const order = await PrivacyGuideOrder.findByIdAndUpdate(
            orderId,
            { status: 'paid', paidAt: new Date(), stripeSessionId: session.id },
            { new: true }
          );
          if (order) {
            try {
              const pdfBuffer = await generatePrivacyGuide({
                firstName: order.firstName,
                lastName: order.lastName,
                email: order.email,
                dob: order.dob,
                currentAddress: order.currentAddress,
                previousAddresses: order.previousAddresses,
              });
              await sendPrivacyGuideEmail(order.email, order.firstName, pdfBuffer);
              await PrivacyGuideOrder.findByIdAndUpdate(orderId, {
                status: 'delivered',
                deliveredAt: new Date(),
              });
              console.log(`[webhook] Privacy guide delivered to ${order.email}`);
            } catch (err) {
              await PrivacyGuideOrder.findByIdAndUpdate(orderId, { status: 'failed' });
              console.error('[webhook] Privacy guide delivery failed:', err);
            }
          }
          break;
        }

        // ── Standard subscription activation ────────────────────────────────
        if (userId) {
          const now = new Date();
          const user = await User.findByIdAndUpdate(
            userId,
            {
              subscriptionStatus: 'active',
              plan: plan || 'community',
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              onboardingStartedAt: now,
              $unset: { reengagementStartedAt: '' },
            },
            { new: true }
          );
          console.log(`[webhook] Activated subscription for user ${userId}`);

          if (user?.email) {
            await sendWelcomeEmail({
              name: user.name,
              email: user.email,
              plan: (plan || 'community') as 'community' | 'legacy_builder',
            }).catch(err => console.error('[webhook] Welcome email failed:', err));
          }
        }
        break;
      }

      // ── Subscription canceled ──────────────────────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const now = new Date();
        await User.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          {
            subscriptionStatus: 'canceled',
            canceledAt: now,
            // Start re-engagement sequence
            reengagementStartedAt: now,
            $unset: { onboardingStartedAt: '' },
          }
        );
        console.log(`[webhook] Canceled subscription ${sub.id}`);
        break;
      }

      // ── Payment failed ─────────────────────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        const user = await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          { subscriptionStatus: 'inactive' },
          { new: true }
        );
        console.log(`[webhook] Payment failed for customer ${customerId}`);
        if (user?.email) {
          await sendPaymentFailedEmail({
            name: user.name,
            email: user.email,
          }).catch(err => console.error('[webhook] Payment failed email error:', err));
        }
        break;
      }

      // ── Payment succeeded (renewal) ────────────────────────────────────────
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          {
            subscriptionStatus: 'active',
            // Clear re-engagement if they paid again
            $unset: { reengagementStartedAt: '' },
          }
        );
        console.log(`[webhook] Renewal succeeded for customer ${customerId}`);
        break;
      }

      // ── Plan upgraded/downgraded ───────────────────────────────────────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const unitAmount = sub.items.data[0]?.price.unit_amount;
        const plan = unitAmount === 9900 ? 'legacy_builder' : 'community';
        await User.findOneAndUpdate(
          { stripeSubscriptionId: sub.id },
          { plan, subscriptionStatus: sub.status === 'active' ? 'active' : 'inactive' }
        );
        break;
      }

      default:
        console.log(`[webhook] Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error('[webhook] Handler error:', err);
    return NextResponse.json({ error: 'Handler error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
