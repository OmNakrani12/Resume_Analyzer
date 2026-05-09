import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('❌ Webhook signature error:', err.message)
    return new NextResponse('Webhook Error', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const email = session.customer_details?.email
    const subscriptionId = session.subscription
    const customerId = session.customer
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    })


    // 🔥 UPDATE DATABASE HERE
    // await db.users.update({
    //   email,
    //   plan: 'pro',
    //   stripeCustomerId: customerId,
    //   stripeSubscriptionId: subscriptionId
    // })
  }

  return NextResponse.json({ received: true })
}
