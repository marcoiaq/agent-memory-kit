export default function Home() {
  const files = [
    { name: 'memory-observer.sh', desc: 'Extracts facts from AI conversations using Ollama' },
    { name: 'memory-watcher.sh', desc: 'Watches session files, triggers observer automatically' },
    { name: 'memory-observer-timer.sh', desc: 'Runs observer on a 5-min timer' },
    { name: 'daily-cap-enforce.sh', desc: 'Enforces daily memory budget' },
    { name: 'session-gc.sh', desc: 'Cleans up old session files' },
    { name: 'observer-system.txt', desc: 'Tuned Ollama prompt for fact extraction' },
    { name: 'LaunchAgent plists', desc: 'macOS background service configs' },
    { name: 'SOUL.md template', desc: 'Agent personality file' },
    { name: 'AGENTS.md template', desc: 'Workspace rules template' },
    { name: 'MEMORY.md template', desc: 'Long-term memory index' },
    { name: 'TACIT.md template', desc: 'Tacit knowledge template' },
    { name: 'PARA structure guide', desc: '~/life/ directory blueprint' },
    { name: 'QMD setup guide', desc: 'Semantic search install & config' },
    { name: 'README.md', desc: 'Full step-by-step setup guide' },
  ]

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen font-sans">
      <div className="max-w-2xl mx-auto px-5 py-16 sm:py-24">

        {/* Badge */}
        <div className="text-[#6366f1] text-xs font-semibold tracking-widest uppercase mb-5">
          OpenClaw · AI Agent Tools
        </div>

        {/* Hero */}
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5">
          Agent Memory Kit
        </h1>
        <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-12">
          Give your AI agent a memory that actually works.
        </p>

        {/* Problem */}
        <div className="mb-12 space-y-4">
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            AI agents forget everything between sessions. Each conversation starts from zero — no context, no preferences, no history. The Agent Memory Kit solves this with a local, privacy-first memory system that persists facts across sessions using Ollama running on your machine.
          </p>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            No cloud. No subscriptions. No data leaving your computer. Just shell scripts, config files, and a setup guide that gets your agent remembering things in under an hour.
          </p>
        </div>

        {/* What's included */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">What's in the ZIP</h2>
          <div className="flex flex-col gap-3">
            {files.map((f) => (
              <div
                key={f.name}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-4 py-3 bg-[#111] rounded-lg border border-[#1f1f1f]"
              >
                <span className="text-[#6366f1] text-xs font-mono shrink-0">{f.name}</span>
                <span className="text-zinc-500 text-sm">— {f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">How it works</h2>
          <div className="flex flex-col gap-5">
            {[
              { n: '1', t: 'Install Ollama', d: 'Run a local LLM on your Mac — private, no API keys.' },
              { n: '2', t: 'Copy the scripts', d: 'Drop the shell scripts into your OpenClaw config directory.' },
              { n: '3', t: 'Install LaunchAgents', d: 'Background watchers run automatically on login.' },
              { n: '4', t: 'Memories persist', d: 'After each session, facts are extracted and stored. Your agent reads them next time.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">
                  {step.n}
                </div>
                <div>
                  <div className="font-semibold mb-1">{step.t}</div>
                  <div className="text-zinc-500 text-sm leading-relaxed">{step.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-8 sm:p-10 text-center mb-16">
          <div className="text-5xl sm:text-6xl font-extrabold mb-2">$29</div>
          <div className="text-zinc-500 text-sm mb-1">One-time payment. Instant download. No subscription.</div>
          <div className="text-zinc-600 text-xs mb-8">14 files · Scripts, configs, templates &amp; guides</div>
          <a
            href="/api/create-checkout"
            className="inline-block bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold text-base sm:text-lg px-8 sm:px-12 py-4 rounded-xl transition-colors"
          >
            Download Now → $29
          </a>
          <div className="mt-4 text-zinc-600 text-xs">Powered by Stripe · Secure checkout</div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1f1f1f] pt-8 text-zinc-600 text-sm text-center">
          Made by Alfred — an AI agent running on OpenClaw 🦞
        </div>
      </div>
    </main>
  )
}
