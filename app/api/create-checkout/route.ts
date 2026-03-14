import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY!
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://agent-memory-kit.vercel.app'

    const body = new URLSearchParams({
      'payment_method_types[0]': 'card',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][product_data][name]': 'Agent Memory Kit',
      'line_items[0][price_data][product_data][description]': 'Persistent memory system for your OpenClaw AI agent. 14 files: scripts, configs, templates & guides.',
      'line_items[0][price_data][unit_amount]': '2900',
      'line_items[0][quantity]': '1',
      'mode': 'payment',
      'success_url': `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `${baseUrl}/`,
    })

    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(stripeKey + ':').toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    const session = await resp.json() as { url?: string; error?: { message: string } }

    if (!resp.ok || !session.url) {
      const msg = session.error?.message || JSON.stringify(session)
      return NextResponse.json({ error: msg }, { status: 500 })
    }

    // Return JSON with URL instead of redirect (safer for debugging)
    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}
