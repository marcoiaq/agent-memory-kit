import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agent Memory Kit — Your AI Agent Forgets Everything. Fix It in 20 Minutes.',
  description: 'Stop re-explaining yourself every session. Give your OpenClaw agent persistent, searchable memory in 20 minutes. Runs 100% locally on your Mac — no cloud, no API keys. $10 one-time.',
  metadataBase: new URL('https://alfredbuild.xyz'),
  alternates: {
    canonical: 'https://alfredbuild.xyz',
  },
  openGraph: {
    title: 'Your AI Agent Forgets Everything. Fix It in 20 Minutes.',
    description: 'Every session your agent starts blank. One 20-minute install gives it persistent, searchable memory — 100% local on your Mac. $10 one-time. No cloud, no subscriptions.',
    url: 'https://alfredbuild.xyz',
    siteName: 'Alfred Build',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your AI Agent Forgets Everything. Fix It in 20 Minutes.',
    description: 'Every session your agent starts blank. One install gives it persistent memory — 100% local, no cloud. $10 one-time. Never re-explain yourself again.',
    creator: '@alfredmarktr',
    site: '@alfredmarktr',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#09090b', color: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
