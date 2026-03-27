'use client'

import { useEffect, useRef, useState } from 'react'

type Segment = { cls: string; content: string }
type Line =
  | { kind: 'text'; cls: string; content: string; delay: number }
  | { kind: 'multi'; parts: Segment[]; delay: number }
  | { kind: 'blank'; delay: number }

const LINES: Line[] = [
  { kind: 'text',  cls: 'dim',  content: '# Agent runs this automatically — you never type this yourself', delay: 200 },
  { kind: 'blank', delay: 100 },
  { kind: 'multi', parts: [{ cls: 'cmd', content: '$ qmd query' }, { cls: 'out', content: ' "what stack are we using for the checkout"' }], delay: 400 },
  { kind: 'blank', delay: 600 },
  { kind: 'multi', parts: [{ cls: 'highlight', content: '→' }, { cls: 'out', content: ' memory/2026-03-10.md  — "Using Stripe + Next.js. No PayPal — integration was a mess."' }], delay: 180 },
  { kind: 'multi', parts: [{ cls: 'highlight', content: '→' }, { cls: 'out', content: ' memory/TACIT.md       — "Always use pnpm, never npm. Deploy to Vercel."' }], delay: 140 },
  { kind: 'multi', parts: [{ cls: 'highlight', content: '→' }, { cls: 'out', content: ' memory/DECISIONS.md   — "Went with App Router, not Pages. Decided 2026-02-28."' }], delay: 160 },
  { kind: 'blank', delay: 200 },
  { kind: 'text',  cls: 'dim',  content: '# Done. Agent already knows — asks nothing, re-explains nothing.', delay: 100 },
]

export default function DemoTerminal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          setPlayed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [played])

  useEffect(() => {
    if (!played) return
    let cumDelay = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    LINES.forEach((line, idx) => {
      cumDelay += line.delay
      const t = setTimeout(() => {
        setVisibleCount(idx + 1)
      }, cumDelay)
      timers.push(t)
    })

    return () => timers.forEach(clearTimeout)
  }, [played])

  const handleReplay = () => {
    setVisibleCount(0)
    setPlayed(false)
    setTimeout(() => setPlayed(true), 50)
  }

  const renderedLines: React.ReactNode[] = []

  LINES.slice(0, visibleCount).forEach((line, idx) => {
    if (line.kind === 'blank') {
      renderedLines.push(<span key={idx}>{'\n'}</span>)
    } else if (line.kind === 'text') {
      renderedLines.push(
        <span key={idx} className={line.cls} style={{ display: 'block' }}>
          {line.content}
        </span>
      )
    } else {
      renderedLines.push(
        <span key={idx} style={{ display: 'block' }}>
          {line.parts.map((p, pi) => (
            <span key={pi} className={p.cls}>{p.content}</span>
          ))}
        </span>
      )
    }
  })

  const isDone = visibleCount >= LINES.length

  return (
    <>
      <div ref={ref} className="demo-terminal">
        <div className="demo-terminal-bar">
          <span className="dot dot-r" />
          <span className="dot dot-y" />
          <span className="dot dot-g" />
        </div>
        <div className="demo-code">
          {played ? (
            <>
              {renderedLines}
              <span className="demo-cursor" />
            </>
          ) : (
            // SSR / pre-play: render full content statically (no flash)
            <>
              <span className="dim" style={{ display: 'block' }}># Agent runs this automatically — you never type this yourself</span>
              <span style={{ display: 'block' }}>&nbsp;</span>
              <span style={{ display: 'block' }}>
                <span className="cmd">$ qmd query</span>
                <span className="out"> &quot;what stack are we using for the checkout&quot;</span>
              </span>
              <span style={{ display: 'block' }}>&nbsp;</span>
              <span style={{ display: 'block' }}>
                <span className="highlight">→</span>
                <span className="out"> memory/2026-03-10.md  — &quot;Using Stripe + Next.js. No PayPal — integration was a mess.&quot;</span>
              </span>
              <span style={{ display: 'block' }}>
                <span className="highlight">→</span>
                <span className="out"> memory/TACIT.md       — &quot;Always use pnpm, never npm. Deploy to Vercel.&quot;</span>
              </span>
              <span style={{ display: 'block' }}>
                <span className="highlight">→</span>
                <span className="out"> memory/DECISIONS.md   — &quot;Went with App Router, not Pages. Decided 2026-02-28.&quot;</span>
              </span>
              <span style={{ display: 'block' }}>&nbsp;</span>
              <span className="dim" style={{ display: 'block' }}># Done. Agent already knows — asks nothing, re-explains nothing.</span>
              <span className="demo-cursor" />
            </>
          )}
        </div>
        {isDone && played && (
          <div style={{ textAlign: 'right', padding: '8px 16px 10px', borderTop: '1px solid #1c1c1f' }}>
            <button onClick={handleReplay} className="demo-replay-btn">↺ replay</button>
          </div>
        )}
      </div>
      <style>{`
        .demo-cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background: #22c55e;
          opacity: 0.85;
          vertical-align: text-bottom;
          margin-left: 3px;
          border-radius: 1px;
          animation: cursor-blink 1.1s step-end infinite;
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 0; }
        }
        .demo-replay-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #52525b;
          font-size: 12px;
          font-family: 'SF Mono', 'Fira Code', 'Menlo', monospace;
          letter-spacing: 0.02em;
          transition: color 0.15s;
          padding: 0;
        }
        .demo-replay-btn:hover {
          color: #818cf8;
        }
      `}</style>
    </>
  )
}
