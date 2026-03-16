import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY!
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alfredbuild.xyz'

    const auth = 'Basic ' + Buffer.from(stripeKey + ':').toString('base64')

    // Build body as FormData-style — pass {CHECKOUT_SESSION_ID} raw (not encoded)
    const fields: Record<string, string> = {
      'payment_method_types[0]': 'card',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][product_data][name]': 'Agent Memory Kit',
      'line_items[0][price_data][product_data][description]': 'Persistent memory for your OpenClaw AI agent. Scripts, configs & setup guide.',
      'line_items[0][price_data][unit_amount]': '1000',
      'line_items[0][quantity]': '1',
      'mode': 'payment',
      'success_url': `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `${baseUrl}/`,
    }

    // Encode manually: encode key and value but leave {} unencoded in success_url
    const body = Object.entries(fields)
      .map(([k, v]) => {
        const encodedKey = encodeURIComponent(k)
        // Don't encode curly braces in the value (Stripe template syntax)
        const encodedVal = encodeURIComponent(v).replace(/%7B/g, '{').replace(/%7D/g, '}')
        return `${encodedKey}=${encodedVal}`
      })
      .join('&')

    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const data = await resp.json() as { url?: string; error?: { message: string } }

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
