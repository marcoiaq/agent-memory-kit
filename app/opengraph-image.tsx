import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Agent Memory Kit — Your AI Agent Forgets Everything. Fix It in 20 Minutes.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 90px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '8px',
            padding: '7px 16px',
            marginBottom: '28px',
            fontSize: '14px',
            fontWeight: 700,
            color: '#818cf8',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Built for OpenClaw · macOS · 100% Local
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 900,
            color: '#fafafa',
            lineHeight: 1.03,
            letterSpacing: '-0.04em',
            marginBottom: '24px',
          }}
        >
          Your AI agent
          <br />
          forgets everything.
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: '24px',
            color: '#a1a1aa',
            lineHeight: 1.5,
            marginBottom: '44px',
            maxWidth: '720px',
          }}
        >
          Persistent, searchable memory for your OpenClaw agent.
          <br />
          20-minute setup. $10 one-time. No cloud.
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#6366f1',
            color: '#fff',
            fontSize: '20px',
            fontWeight: 700,
            padding: '16px 32px',
            borderRadius: '12px',
            letterSpacing: '-0.01em',
          }}
        >
          Get Agent Memory Kit — $10 →
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '44px',
            right: '90px',
            fontSize: '16px',
            color: '#3f3f46',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          alfredbuild.xyz
        </div>
      </div>
    ),
    { ...size }
  )
}
