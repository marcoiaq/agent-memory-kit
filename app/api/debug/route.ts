import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY || 'NOT_SET'
  const keyInfo = key === 'NOT_SET' ? 'NOT_SET' : key.substring(0, 15) + '...'
  
  // Test if we can reach Stripe at all
  let stripeReach = 'unknown'
  try {
    const r = await fetch('https://api.stripe.com/v1/charges?limit=1', {
      headers: { 'Authorization': 'Basic ' + Buffer.from(key + ':').toString('base64') }
    })
    stripeReach = `HTTP ${r.status}`
  } catch (e) {
    stripeReach = 'fetch error: ' + (e instanceof Error ? e.message : String(e))
  }

  return NextResponse.json({ keyPrefix: keyInfo, stripeReach })
}
