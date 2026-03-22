'use client'

import { useState, useEffect } from 'react'

export default function DesktopScrollBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 480
      setVisible(shouldShow)
      document.body.classList.toggle('bar-visible', shouldShow)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.body.classList.remove('bar-visible')
    }
  }, [])

  return (
    <>
      <style>{`
        .desktop-scroll-bar {
          display: none;
        }
        @media (min-width: 521px) {
          .desktop-scroll-bar {
            display: block;
            position: fixed;
            bottom: 0; left: 0; right: 0;
            z-index: 100;
            background: rgba(9,9,11,0.97);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border-top: 1px solid #27272a;
            padding: 12px 24px 16px;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .desktop-scroll-bar-inner {
            max-width: 700px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }
          .desktop-scroll-bar-left {
            display: flex;
            align-items: center;
            gap: 20px;
            flex: 1;
            min-width: 0;
          }
          .desktop-scroll-bar-title {
            font-size: 14px;
            font-weight: 700;
            color: #fafafa;
            white-space: nowrap;
          }
          .desktop-scroll-bar-meta {
            font-size: 13px;
            color: #71717a;
            white-space: nowrap;
          }
          .desktop-scroll-bar-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #6366f1;
            color: #fff;
            font-size: 14px;
            font-weight: 700;
            padding: 10px 22px;
            border-radius: 10px;
            white-space: nowrap;
            flex-shrink: 0;
            box-shadow: 0 4px 16px rgba(99,102,241,0.4);
            text-decoration: none;
            transition: background 0.15s;
          }
          .desktop-scroll-bar-btn:hover {
            background: #4f46e5;
          }
          .desktop-scroll-bar-trust {
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .desktop-scroll-bar-trust-item {
            font-size: 12px;
            color: #71717a;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .desktop-scroll-bar-trust-item::before {
            content: '✓';
            color: #22c55e;
            font-weight: 700;
            font-size: 11px;
          }
          .desktop-scroll-bar-stripe {
            font-size: 12px;
            color: #52525b;
            display: flex;
            align-items: center;
            gap: 4px;
            padding-left: 4px;
          }
          body.bar-visible {
            padding-bottom: 72px;
          }
        }
      `}</style>
      <div
        className="desktop-scroll-bar"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <div className="desktop-scroll-bar-inner">
          <div className="desktop-scroll-bar-left">
            <span className="desktop-scroll-bar-title">Agent Memory Kit</span>
            <div className="desktop-scroll-bar-trust">
              <span className="desktop-scroll-bar-trust-item"><span style={{textDecoration:'line-through', color:'#52525b', marginRight:'4px'}}>$29</span>$10 one-time</span>
              <span className="desktop-scroll-bar-trust-item">Instant download</span>
              <span className="desktop-scroll-bar-trust-item">7-day refund</span>
              <span className="desktop-scroll-bar-stripe">🔒 Stripe</span>
            </div>
          </div>
          <a href="/api/create-checkout" className="desktop-scroll-bar-btn">
            Fix My Agent&apos;s Memory — $10 →
          </a>
        </div>
      </div>
    </>
  )
}
