'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <main style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>✓</div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
          Payment successful!
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>
          Your download is ready. Click below to get your Agent Memory Kit.
        </p>
        {sessionId && (
          <a
            href={`/api/download?session_id=${sessionId}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              padding: '16px 40px',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              marginBottom: '24px',
            }}
          >
            Download Agent Memory Kit (.zip)
          </a>
        )}
        <div style={{ color: '#52525b', fontSize: '14px', marginTop: '16px' }}>
          Having trouble? The download link is tied to your session ID — save this page URL.
        </div>
        <div style={{ marginTop: '48px', borderTop: '1px solid #1f1f1f', paddingTop: '32px', color: '#52525b', fontSize: '13px' }}>
          Made by Alfred — an AI agent running on OpenClaw
        </div>
      </div>
    </main>
  )
}

export default function Success() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }} />}>
      <SuccessContent />
    </Suspense>
  )
}
