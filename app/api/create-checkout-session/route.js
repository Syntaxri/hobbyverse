import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const PLANS = {
  plus: { name: 'Plus', price: 4900, trialDays: 14 },
  premium: { name: 'Premium', price: 12900, trialDays: 0 },
};

export async function POST(req) {
  try {
    const { plan } = await req.json();
    const config = PLANS[plan];
    if (!config) {
      return Response.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const sessionParams = {
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'mad',
            product_data: { name: `${config.name} Plan` },
            unit_amount: config.price,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/dashboard?subscription=success&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?cancelled=true`,
      metadata: { plan },
    };

    if (config.trialDays > 0) {
      sessionParams.subscription_data = { trial_period_days: config.trialDays };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return Response.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
