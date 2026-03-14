import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY!
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://agent-memory-kit.vercel.app'
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/`

    // Build form body manually to avoid URLSearchParams encoding curly braces in success_url
    const params = [
      'payment_method_types[0]=card',
      'line_items[0][price_data][currency]=usd',
      encodeURIComponent('line_items[0][price_data][product_data][name]') + '=' + encodeURIComponent('Agent Memory Kit'),
      encodeURIComponent('line_items[0][price_data][product_data][description]') + '=' + encodeURIComponent('Persistent memory system for your OpenClaw AI agent. Scripts, configs, templates & guides.'),
      'line_items[0][price_data][unit_amount]=2900',
      'line_items[0][quantity]=1',
      'mode=payment',
      'success_url=' + encodeURIComponent(successUrl),
      'cancel_url=' + encodeURIComponent(cancelUrl),
    ].join('&')

    const authHeader = 'Basic ' + Buffer.from(stripeKey + ':').toString('base64')

    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })

    const session = await resp.json() as { url?: string; error?: { message: string } }

    if (!resp.ok || !session.url) {
      const msg = session.error?.message || JSON.stringify(session)
      console.error('Stripe error:', msg)
      return NextResponse.json({ error: msg }, { status: 500 })
    }

    return NextResponse.redirect(session.url, 303)
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Caught error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}
