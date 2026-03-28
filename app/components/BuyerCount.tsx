'use client'

import { useEffect, useState } from 'react'

// Only show buyer count if >= this threshold (avoids showing small numbers)
const MIN_DISPLAY_COUNT = 5

export default function BuyerCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/buyer-count')
      .then((r) => r.json())
      .then((d: { count: number }) => {
        if (d.count >= MIN_DISPLAY_COUNT) {
          setCount(d.count)
        }
      })
      .catch(() => {
        // silently ignore — component just won't render
      })
  }, [])

  if (count === null) return null

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
