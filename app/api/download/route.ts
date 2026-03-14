import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'
import { KIT_FILES } from '@/lib/kit-files'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    // Verify payment via native fetch (no Stripe SDK network issues)
    const stripeKey = process.env.STRIPE_SECRET_KEY!
    const auth = 'Basic ' + Buffer.from(stripeKey + ':').toString('base64')

    const resp = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { 'Authorization': auth } }
    )

    if (!resp.ok) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 402 })
    }

    const session = await resp.json() as { payment_status: string }

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed. Complete checkout to download.' },
        { status: 402 }
      )
    }

    // Generate ZIP with all kit files
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
    return NextResponse.json({ error: 'Failed to process download' }, { status: 500 })
  }
}
