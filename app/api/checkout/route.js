import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  const { priceId } = await req.json();
  if (!priceId) {
    return NextResponse.json(
      { error: 'Price ID is required' },
      { status: 400 }
    )
  }
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/pricing?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
