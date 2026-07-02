import Stripe from 'stripe';
import { getAllProducts } from '@/lib/getProduct';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function POST(req) {
  try {
    const { productId, duration, quantity, address } = await req.json();
    if (!productId || !duration || !quantity || !address) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = getAllProducts().find((p) => p.id === productId);
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    const unitPrice = product[duration] || product.weekly;
    const total = unitPrice * quantity;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'mad',
            product_data: {
              name: product.name,
              description: `${duration} rental · ${quantity} ${quantity > 1 ? 'units' : 'unit'}`,
              images: product.image ? [`${siteUrl}${product.image}`] : [],
            },
            unit_amount: Math.round(unitPrice * 100),
          },
          quantity,
        },
      ],
      metadata: {
        productId,
        duration,
        quantity: String(quantity),
        address: JSON.stringify(address),
        unitPrice: String(unitPrice),
      },
      success_url: `${siteUrl}/rental/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/product/${productId}`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error('Create rental payment error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
