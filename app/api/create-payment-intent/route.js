import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST() {
  try {
    const paymentIntent =
      await stripe.paymentIntents.create({
        amount: 999,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      })

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    )
  }
}