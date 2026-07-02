import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      return Response.json({ valid: false, error: 'Missing session_id' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const subscription = await stripe.subscriptions.retrieve(session.subscription);

    const plan = session.metadata?.plan || 'plus';
    const status = subscription.status;
    const isActive = status === 'active' || status === 'trialing';
    const trialEnd = subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null;

    return Response.json({
      valid: isActive,
      plan,
      subscriptionId: session.subscription,
      status,
      trialEnd,
      customerEmail: session.customer_details?.email,
    });
  } catch (err) {
    console.error('Session verification error:', err);
    return Response.json({ valid: false, error: err.message }, { status: 500 });
  }
}
