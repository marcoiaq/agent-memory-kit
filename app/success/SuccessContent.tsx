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
      </div>
    </main>
  )
}
