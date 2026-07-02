import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const plan = session.metadata?.plan || 'plus';
        const subscriptionId = session.subscription;
        console.log(`Checkout completed: plan=${plan}, subscription=${subscriptionId}`);
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`Subscription ${subscription.id} ${event.type}`);
        break;
      }
    }

    return Response.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export const config = { api: { bodyParser: false } };
