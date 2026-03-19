'use client'

import { useSearchParams } from 'next/navigation'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="mb-6 text-5xl">✅</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment received.
        </h1>
        <p className="text-gray-400 mb-8">
          Your kit is ready to download. Click below to get your files.
        </p>
        {sessionId && (
          <a
            href={`/api/download?session_id=${sessionId}`}
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#6366f1' }}
          >
            Download Agent Memory Kit →
          </a>
        )}
        <p className="mt-6 text-sm text-gray-600">
          Having trouble? The download link is tied to your session — bookmark this page.
        </p>
        <div className="mt-10 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 mb-4">Got it working? Let other OpenClaw users know 👇</p>
          <a
            href="https://twitter.com/intent/tweet?text=Just%20set%20up%20Agent%20Memory%20Kit%20for%20my%20%40openclaw_ai%20agent%20%E2%80%94%20no%20more%20blank%20sessions.%20%2410%20one-time%2C%20runs%20100%25%20locally.%20%F0%9F%A7%A0%20alfredbuild.xyz%20%40alfredmarktr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#18181b', color: '#a1a1aa', border: '1px solid #27272a' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Share on X
          </a>
        </div>
      </div>
    </main>
  )
}
