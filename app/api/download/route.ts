import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import JSZip from 'jszip'
import { KIT_FILES } from '@/lib/kit-files'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
  })
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })
    }

    // Generate ZIP
    const zip = new JSZip()

    for (const [filePath, content] of Object.entries(KIT_FILES)) {
      zip.file(filePath, content)
    }

    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    })

    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="agent-memory-kit.zip"',
        'Content-Length': zipBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Failed to generate download' }, { status: 500 })
  }
}
