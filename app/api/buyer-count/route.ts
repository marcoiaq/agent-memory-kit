import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
// Cache for 5 minutes — avoid hammering Stripe on every page load
export const revalidate = 300

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json({ count: 0 }, { status: 200 })
    }

    const auth = 'Basic ' + Buffer.from(stripeKey + ':').toString('base64')

    // Fetch completed checkout sessions for Agent Memory Kit ($10 = 1000 cents)
    // Use payment_intents with amount = 1000 and status = succeeded
    const resp = await fetch(
      'https://api.stripe.com/v1/payment_intents?limit=100&currency=usd',
      {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // 5-second timeout via AbortSignal
        signal: AbortSignal.timeout(5000),
      }
    )

    if (!resp.ok) {
      return NextResponse.json({ count: 0 }, { status: 200 })
    }

    const data = await resp.json() as {
      data: Array<{ amount: number; status: string; currency: string }>
      has_more: boolean
      total_count?: number
    }

    // Count succeeded $10 payments (1000 cents)
    const count = data.data.filter(
      (pi) => pi.status === 'succeeded' && pi.amount === 1000
    ).length

    // If there are more pages, add a conservative estimate
    // (we cap at 100 per page; if has_more, the real count is higher)
    const displayCount = data.has_more ? count + 1 : count

    return NextResponse.json(
      { count: displayCount },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch {
    // Silently fail — never break the page over this
    return NextResponse.json({ count: 0 }, { status: 200 })
  }
}
