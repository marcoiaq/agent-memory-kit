'use client'

import { useEffect, useState } from 'react'

// Only show buyer count if >= this threshold (avoids showing small numbers)
const MIN_DISPLAY_COUNT = 5

// Fallback stat shown when buyer count is below threshold
// Highlights the transparency/security angle — plain-text package, nothing compiled
function FallbackStat() {
  return (
    <div className="proof-stat" style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
      <span style={{ fontSize: '15px', flexShrink: 0, lineHeight: 1 }}>📦</span>
      <span>Plain-text scripts &amp; configs — inspect every line before running</span>
    </div>
  )
}

export default function BuyerCount() {
  const [count, setCount] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/buyer-count')
      .then((r) => r.json())
      .then((d: { count: number }) => {
        if (d.count >= MIN_DISPLAY_COUNT) {
          setCount(d.count)
        }
        setLoaded(true)
      })
      .catch(() => {
        // show fallback on error
        setLoaded(true)
      })
  }, [])

  // Before fetch resolves, render nothing (avoids layout shift)
  if (!loaded) return null

  if (count !== null) {
    return (
      <div className="proof-stat" style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{
          display: 'inline-block',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#22c55e',
          flexShrink: 0,
          boxShadow: '0 0 5px rgba(34,197,94,0.5)',
        }} />
        <span>
          <strong style={{ color: '#fafafa', fontWeight: 700 }}>{count}+</strong>
          {' '}developers already running persistent memory
        </span>
      </div>
    )
  }

  // count < 5 — show transparency/security stat instead
  return <FallbackStat />
}
