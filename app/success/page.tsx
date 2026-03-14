'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #09090b; color: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .page {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 40px 24px;
        }
        .card {
          max-width: 480px; width: 100%; text-align: center;
        }
        .check {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 28px; font-size: 24px;
        }
        h1 {
          font-size: 28px; font-weight: 800; letter-spacing: -0.03em;
          margin-bottom: 12px; color: #fafafa;
        }
        .desc {
          font-size: 16px; color: #71717a; line-height: 1.65;
          margin-bottom: 36px;
        }
        .download-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #6366f1; color: #fff;
          font-size: 16px; font-weight: 700;
          padding: 14px 32px; border-radius: 10px;
          text-decoration: none; letter-spacing: -0.01em;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35);
          transition: background 0.15s;
        }
        .download-btn:hover { background: #4f46e5; }
        .note {
          margin-top: 20px; font-size: 13px; color: #3f3f46;
          line-height: 1.6;
        }
        .no-session {
          font-size: 15px; color: #71717a; line-height: 1.7;
        }
        .back { margin-top: 16px; display: inline-block; font-size: 13px; color: #52525b; text-decoration: underline; }
      `}</style>
      <div className="page">
        <div className="card">
          {sessionId ? (
            <>
              <div className="check">✓</div>
              <h1>Payment confirmed.</h1>
              <p className="desc">
                Your Agent Memory Kit is ready. Click below to download the ZIP file with all scripts, configs, and setup guide.
              </p>
              <a href={`/api/download?session_id=${sessionId}`} className="download-btn">
                ↓ Download Agent Memory Kit
              </a>
              <p className="note">
                Bookmark this page — the download link is tied to your session and will keep working.
              </p>
            </>
          ) : (
            <>
              <h1>Looking for your download?</h1>
              <p className="no-session">
                If you completed a purchase, check your email for the payment confirmation and use the link from there. Or return to the homepage and try again.
              </p>
              <a href="/" className="back">← Back to homepage</a>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default function Success() {
  return (
    <Suspense fallback={
      <div style={{ background: '#09090b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fafafa', fontFamily: 'sans-serif' }}>
        Loading...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
