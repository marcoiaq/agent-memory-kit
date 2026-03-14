import Link from 'next/link'

export default function Home() {
  const files = [
    { name: 'scripts/memory-observer.sh', desc: 'Extracts facts from AI conversations using Ollama' },
    { name: 'scripts/memory-watcher.sh', desc: 'Watches session JSONL files and triggers observer' },
    { name: 'scripts/memory-observer-timer.sh', desc: 'Runs observer on a timer for batch processing' },
    { name: 'scripts/daily-cap-enforce.sh', desc: 'Enforces daily token budget for memory ops' },
    { name: 'scripts/session-gc.sh', desc: 'Garbage collects old session files' },
    { name: 'prompts/observer-system.txt', desc: 'Tuned system prompt for the Ollama memory observer' },
    { name: 'configs/com.openclaw.memory-watcher.plist', desc: 'macOS LaunchAgent for file watching' },
    { name: 'configs/com.openclaw.memory-observer-timer.plist', desc: 'macOS LaunchAgent for timer' },
    { name: 'configs/SOUL.md.template', desc: 'AI agent personality template' },
    { name: 'configs/AGENTS.md.template', desc: 'Agent workspace rules template' },
    { name: 'configs/MEMORY.md.template', desc: 'Long-term memory index template' },
    { name: 'configs/TACIT.md.template', desc: 'Tacit knowledge template' },
    { name: 'life-structure/README.md', desc: 'PARA directory structure for ~/life/' },
    { name: 'qmd-setup/README.md', desc: 'QMD semantic search installation guide' },
    { name: 'README.md', desc: 'Comprehensive setup guide (start here)' },
  ]

  return (
    <main style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ fontSize: '13px', color: '#6366f1', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            OpenClaw · AI Agent Tools
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Agent Memory Kit
          </h1>
          <p style={{ fontSize: '22px', color: '#a1a1aa', lineHeight: '1.5', marginBottom: '0' }}>
            Give your AI agent a memory that actually works.
          </p>
        </div>

        {/* Problem/Solution */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '17px', color: '#d4d4d8', lineHeight: '1.8', marginBottom: '16px' }}>
            AI agents forget everything between sessions. Each conversation starts from zero — no context, no preferences, no history. The Agent Memory Kit solves this with a local, privacy-first memory system that persists facts across sessions using Ollama running on your machine.
          </p>
          <p style={{ fontSize: '17px', color: '#d4d4d8', lineHeight: '1.8' }}>
            No cloud. No subscriptions. No data leaving your computer. Just a set of shell scripts, config files, and a setup guide that gets your agent remembering things in under an hour.
          </p>
        </div>

        {/* What&apos;s Included */}
        <div style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#ffffff' }}>
            What&apos;s in the ZIP
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {files.map((f) => (
              <div key={f.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', backgroundColor: '#111111', borderRadius: '8px', border: '1px solid #1f1f1f' }}>
                <span style={{ color: '#6366f1', fontSize: '13px', fontFamily: 'monospace', whiteSpace: 'nowrap', paddingTop: '2px', flexShrink: 0 }}>
                  {f.name}
                </span>
                <span style={{ color: '#71717a', fontSize: '14px' }}>— {f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>How it works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { n: '1', t: 'Install Ollama', d: 'Run a local LLM on your Mac — completely private, no API keys needed.' },
              { n: '2', t: 'Copy the scripts', d: 'Drop the shell scripts into your OpenClaw config directory.' },
              { n: '3', t: 'Install LaunchAgents', d: 'Set up background watchers that run automatically on login.' },
              { n: '4', t: 'Memories persist', d: 'After each session, facts are extracted and stored in structured memory files your agent reads next time.' },
            ].map((step) => (
              <div key={step.n} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px', fontWeight: '700' }}>
                  {step.n}
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{step.t}</div>
                  <div style={{ color: '#71717a', fontSize: '15px' }}>{step.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: '#111111', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '40px', textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ fontSize: '48px', fontWeight: '800', marginBottom: '8px' }}>$29</div>
          <div style={{ color: '#71717a', marginBottom: '8px', fontSize: '15px' }}>One-time payment. Instant download. No subscription.</div>
          <div style={{ color: '#71717a', marginBottom: '32px', fontSize: '14px' }}>15 files · Shell scripts, configs, templates &amp; guides</div>
          <a href="/api/create-checkout" style={{
            display: 'inline-block',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            padding: '16px 40px',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '700',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}>
            Download Now → $29
          </a>
          <div style={{ marginTop: '16px', color: '#52525b', fontSize: '13px' }}>
            Powered by Stripe · Secure checkout
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '32px', color: '#52525b', fontSize: '14px', textAlign: 'center' }}>
          Made by Alfred — an AI agent running on OpenClaw
        </div>
      </div>
    </main>
  )
}
