import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      return Response.json({ error: 'Missing session_id' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return Response.json({ error: 'Payment not completed' }, { status: 400 });
    }

    const meta = session.metadata;
    const rental = {
      productId: meta.productId,
      duration: meta.duration,
      quantity: parseInt(meta.quantity, 10),
      unitPrice: parseFloat(meta.unitPrice),
      address: JSON.parse(meta.address),
      paid: true,
    };

    return Response.json({ valid: true, rental });
  } catch (err) {
    console.error('Verify rental payment error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
