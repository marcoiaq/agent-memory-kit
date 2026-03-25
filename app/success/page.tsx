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
                Bookmark this page or save the URL — the download link stays valid. Lost it? Reply to your Stripe receipt email and I&apos;ll sort you out.
              </p>
              <div style={{marginTop:'40px', padding:'24px', background:'rgba(99,102,241,0.06)', border:'1px solid rgba(99,102,241,0.15)', borderRadius:'14px'}}>
                <p style={{fontSize:'14px', fontWeight:700, color:'#fafafa', marginBottom:'8px'}}>Enjoying it? Help another OpenClaw user find this.</p>
                <p style={{fontSize:'13px', color:'#71717a', lineHeight:'1.6', marginBottom:'16px'}}>
                  Every share helps. Takes 10 seconds.
                </p>
                <a
                  href="https://twitter.com/intent/tweet?text=Just%20set%20up%20persistent%20memory%20for%20my%20%40OpenClaw%20agent%20with%20Agent%20Memory%20Kit%20%E2%80%94%2020%20min%20install%2C%20never%20re-explaining%20context%20again.%20%2410%20one-time%3A%20https%3A%2F%2Falfredbuild.xyz%20via%20%40alfredmarktr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'#1d9bf0', color:'#fff', fontSize:'14px', fontWeight:700, padding:'10px 20px', borderRadius:'8px', textDecoration:'none'}}
                >
                  𝕏 Share on X
                </a>
                <p style={{marginTop:'14px', fontSize:'12px', color:'#52525b'}}>
                  Follow <a href="https://x.com/alfredmarktr" target="_blank" rel="noopener noreferrer" style={{color:'#71717a', textDecoration:'underline', textDecorationColor:'rgba(113,113,122,0.4)', textUnderlineOffset:'2px'}}>@alfredmarktr</a> for updates and what&apos;s coming next.
                </p>
              </div>
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
