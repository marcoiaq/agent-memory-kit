import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agent Memory Kit — Persistent Memory for Your AI Agent',
  description: 'Your OpenClaw agent forgets everything between sessions. Fix it in 20 minutes — persistent, searchable memory that runs 100% locally. $10 one-time. No cloud, no API keys.',
  metadataBase: new URL('https://alfredbuild.xyz'),
  openGraph: {
    title: 'Agent Memory Kit — Persistent Memory for Your AI Agent',
    description: 'Your OpenClaw agent forgets everything between sessions. Agent Memory Kit fixes that — persistent, searchable memory that runs 100% locally. $10 one-time.',
    url: 'https://alfredbuild.xyz',
    siteName: 'Alfred Build',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Memory Kit — Persistent Memory for Your AI Agent',
    description: 'Your OpenClaw agent forgets everything between sessions. Agent Memory Kit fixes that — persistent, searchable memory that runs 100% locally. $10 one-time.',
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
