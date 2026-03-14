import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY!
    const baseUrl = 'https://agent-memory-kit.vercel.app'

    const auth = 'Basic ' + Buffer.from(stripeKey + ':').toString('base64')

    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: [
        'payment_method_types[0]=card',
        'line_items[0][price_data][currency]=usd',
        'line_items[0][price_data][product_data][name]=Agent+Memory+Kit',
        'line_items[0][price_data][product_data][description]=Persistent+memory+system+for+your+OpenClaw+AI+agent',
        'line_items[0][price_data][unit_amount]=2900',
        'line_items[0][quantity]=1',
        'mode=payment',
        `success_url=${encodeURIComponent(baseUrl + '/success')}`,
        `cancel_url=${encodeURIComponent(baseUrl + '/')}`,
      ].join('&'),
    })

    const data = await resp.json() as { url?: string; id?: string; error?: { message: string } }

    if (!resp.ok || !data.url) {
      return NextResponse.json({ error: data.error?.message || JSON.stringify(data) }, { status: 500 })
    }

    return NextResponse.redirect(data.url, 303)
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}
