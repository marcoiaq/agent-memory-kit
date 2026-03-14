export default function Home() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0c0c0e;
          color: #f4f4f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Layout ── */
        .wrap { max-width: 660px; margin: 0 auto; padding: 0 24px; }

        /* ── Nav ── */
        nav {
          border-bottom: 1px solid #1c1c1f;
          padding: 18px 0;
        }
        nav .wrap { display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 15px; font-weight: 700; color: #f4f4f5; letter-spacing: -0.02em; }
        .nav-price {
          font-size: 14px; font-weight: 600; color: #818cf8;
          text-decoration: none;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          padding: 6px 16px; border-radius: 20px;
          transition: background 0.15s;
        }
        .nav-price:hover { background: rgba(99,102,241,0.2); }

        /* ── Hero ── */
        .hero {
          padding: 80px 0 64px;
          border-bottom: 1px solid #1c1c1f;
        }
        .hero-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: #818cf8;
          margin-bottom: 28px;
        }
        .hero-label::before {
          content: ''; width: 6px; height: 6px;
          background: #818cf8; border-radius: 50%;
        }
        h1 {
          font-size: clamp(36px, 7vw, 56px);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.035em;
          color: #f4f4f5;
          margin-bottom: 24px;
        }
        h1 .accent { color: #818cf8; }
        .hero-sub {
          font-size: clamp(16px, 2.5vw, 18px);
          color: #71717a;
          line-height: 1.65;
          max-width: 520px;
          margin-bottom: 40px;
        }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: #6366f1;
          color: #fff;
          font-size: 16px; font-weight: 700;
          padding: 15px 32px; border-radius: 12px;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: background 0.15s, transform 0.1s;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35);
        }
        .hero-cta:hover { background: #4f46e5; transform: translateY(-1px); }
        .hero-cta .arrow { font-size: 20px; }
        .hero-meta {
          display: flex; align-items: center; gap: 20px;
          margin-top: 20px; flex-wrap: wrap;
        }
        .meta-item {
          font-size: 13px; color: #52525b;
          display: flex; align-items: center; gap: 6px;
        }
        .meta-check { color: #22c55e; font-size: 14px; }

        /* ── Section ── */
        section { padding: 56px 0; border-bottom: 1px solid #1c1c1f; }
        .section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #52525b;
          margin-bottom: 20px;
        }
        h2 {
          font-size: clamp(22px, 4vw, 28px);
          font-weight: 800; letter-spacing: -0.025em;
          color: #f4f4f5; margin-bottom: 16px;
        }
        .section-body {
          font-size: 16px; color: #71717a; line-height: 1.7;
          margin-bottom: 12px;
        }

        /* ── Features grid ── */
        .features { display: flex; flex-direction: column; gap: 0; margin-top: 32px; }
        .feature {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 20px 0; border-bottom: 1px solid #1c1c1f;
        }
        .feature:last-child { border-bottom: none; }
        .feature-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: #18181b; border: 1px solid #27272a;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
        }
        .feature-title { font-size: 15px; font-weight: 600; color: #f4f4f5; margin-bottom: 4px; }
        .feature-desc { font-size: 14px; color: #71717a; line-height: 1.55; }

        /* ── Files ── */
        .files { margin-top: 28px; }
        .file-item {
          display: flex; gap: 12px; align-items: baseline;
          padding: 11px 0; border-bottom: 1px solid #18181b;
          font-size: 14px;
        }
        .file-item:last-child { border-bottom: none; }
        .file-name {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 11.5px; color: #818cf8;
          flex-shrink: 0; min-width: 170px;
        }
        .file-desc { color: #52525b; line-height: 1.4; }

        /* ── Steps ── */
        .steps { margin-top: 32px; display: flex; flex-direction: column; gap: 0; }
        .step {
          display: flex; gap: 20px;
          padding: 24px 0; border-bottom: 1px solid #1c1c1f;
        }
        .step:last-child { border-bottom: none; }
        .step-n {
          font-size: 13px; font-weight: 800; color: #818cf8;
          width: 28px; flex-shrink: 0; padding-top: 2px;
        }
        .step-title { font-size: 15px; font-weight: 700; color: #f4f4f5; margin-bottom: 6px; }
        .step-desc { font-size: 14px; color: #71717a; line-height: 1.6; }

        /* ── CTA ── */
        .cta-section { padding: 64px 0; }
        .cta-box {
          background: #111114;
          border: 1px solid #27272a;
          border-radius: 20px;
          padding: 48px 40px;
          text-align: center;
        }
        .cta-tag {
          display: inline-block; font-size: 12px; font-weight: 600;
          color: #22c55e; background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          padding: 4px 12px; border-radius: 20px; margin-bottom: 20px;
        }
        .cta-head { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; }
        .cta-sub { font-size: 15px; color: #52525b; margin-bottom: 32px; line-height: 1.6; }
        .price-row { display: flex; align-items: baseline; gap: 8px; justify-content: center; margin-bottom: 28px; }
        .price { font-size: 60px; font-weight: 900; letter-spacing: -0.05em; line-height: 1; }
        .price-label { font-size: 14px; color: #52525b; }
        .cta-btn {
          display: inline-block;
          background: #6366f1; color: #fff;
          font-size: 17px; font-weight: 700;
          padding: 16px 44px; border-radius: 12px;
          text-decoration: none; letter-spacing: -0.01em;
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
          transition: background 0.15s, transform 0.1s;
        }
        .cta-btn:hover { background: #4f46e5; transform: translateY(-1px); }
        .cta-note { font-size: 12px; color: #3f3f46; margin-top: 16px; }

        /* ── Footer ── */
        footer {
          border-top: 1px solid #1c1c1f;
          padding: 28px 0;
          text-align: center;
          font-size: 13px; color: #3f3f46;
        }

        /* ── Mobile ── */
        @media (max-width: 520px) {
          .hero { padding: 56px 0 48px; }
          .cta-box { padding: 36px 24px; }
          .price { font-size: 52px; }
          .file-item { flex-direction: column; gap: 4px; }
          .file-name { min-width: unset; }
          .hero-meta { gap: 12px; }
        }
      `}</style>

      {/* Nav */}
      <nav>
        <div className="wrap">
          <span className="logo">Agent Memory Kit</span>
          <a href="/api/create-checkout" className="nav-price">Get it — $29</a>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="wrap">
          <div className="hero-label">For OpenClaw agents</div>
          <h1>Your AI agent<br />forgets everything.<br /><span className="accent">Fix that.</span></h1>
          <p className="hero-sub">
            Agent Memory Kit is the complete setup for persistent, searchable memory on OpenClaw — so your agent remembers decisions, context, and preferences across every session.
          </p>
          <a href="/api/create-checkout" className="hero-cta">
            Fix my agent's memory <span className="arrow">→</span>
          </a>
          <div className="hero-meta">
            <span className="meta-item"><span className="meta-check">✓</span> Instant download</span>
            <span className="meta-item"><span className="meta-check">✓</span> One-time $29</span>
            <span className="meta-item"><span className="meta-check">✓</span> No cloud, runs locally</span>
          </div>
        </div>
      </div>

      {/* Problem */}
      <section>
        <div className="wrap">
          <div className="section-label">The problem</div>
          <h2>Every session, your agent starts from zero.</h2>
          <p className="section-body">
            No context. No history. No memory of decisions you already made. You end up re-explaining yourself constantly, and your agent keeps making the same mistakes.
          </p>
          <p className="section-body">
            Agent Memory Kit fixes this with a local system powered by Ollama — your agent reads and writes memory files between sessions. Fully private. Nothing leaves your machine.
          </p>
          <div className="features">
            {[
              ['🧠', 'Persistent memory', 'Facts, decisions, and context are extracted from each session and stored for the next one.'],
              ['🔍', 'Semantic search', 'QMD lets your agent search across all memory files using natural language. Find anything instantly.'],
              ['🔒', 'Fully private', 'Everything runs on your Mac with Ollama. No cloud, no API keys, no data leaving your machine.'],
              ['⚡', 'Runs automatically', 'macOS LaunchAgents start the memory watcher on login. Zero manual steps.'],
            ].map(([icon, title, desc]) => (
              <div className="feature" key={title}>
                <div className="feature-icon">{icon}</div>
                <div>
                  <div className="feature-title">{title}</div>
                  <div className="feature-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section>
        <div className="wrap">
          <div className="section-label">What's in the ZIP</div>
          <h2>Everything you need. Nothing you don't.</h2>
          <div className="files">
            {[
              ['memory-observer.sh', 'Extracts facts from conversations using Ollama'],
              ['memory-watcher.sh', 'Watches session files, triggers observer automatically'],
              ['memory-observer-timer.sh', 'Runs observer on a 5-minute background timer'],
              ['daily-cap-enforce.sh', 'Prevents memory files from growing unbounded'],
              ['session-gc.sh', 'Cleans up JSONL session files older than 30 days'],
              ['observer-system.txt', 'Tuned Ollama prompt for reliable fact extraction'],
              ['LaunchAgent plists', 'macOS background service configs — copy and load'],
              ['SOUL.md template', 'Agent personality and behavioral rules'],
              ['AGENTS.md template', 'Workspace setup and session context'],
              ['MEMORY.md template', 'Long-term curated memory index'],
              ['TACIT.md template', 'Tacit knowledge and preferences'],
              ['PARA structure guide', 'Blueprint for ~/life/ directory architecture'],
              ['QMD setup guide', 'Install and configure semantic search'],
              ['README.md', 'Full step-by-step setup guide'],
            ].map(([name, desc]) => (
              <div className="file-item" key={name}>
                <span className="file-name">{name}</span>
                <span className="file-desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="wrap">
          <div className="section-label">Setup</div>
          <h2>Up and running in under an hour.</h2>
          <div className="steps">
            {[
              ['01', 'Install Ollama', 'Run llama3.2 locally on your Mac. Free, private, no API keys required.'],
              ['02', 'Copy the scripts', 'Drop the included shell scripts into your OpenClaw workspace directory.'],
              ['03', 'Load the LaunchAgents', 'Two background services start automatically on login. No manual running required.'],
              ['04', 'Your agent remembers', 'After each session, facts are extracted and stored. Your agent reads them next time.'],
            ].map(([n, title, desc]) => (
              <div className="step" key={n}>
                <div className="step-n">{n}</div>
                <div>
                  <div className="step-title">{title}</div>
                  <div className="step-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="wrap">
          <div className="cta-box">
            <div className="cta-tag">Instant download after payment</div>
            <div className="cta-head">Fix your agent's memory today.</div>
            <p className="cta-sub">
              14 files. Scripts, configs, templates, and a full setup guide.<br />
              Works on macOS with any OpenClaw setup.
            </p>
            <div className="price-row">
              <span className="price">$29</span>
              <span className="price-label">one-time</span>
            </div>
            <a href="/api/create-checkout" className="cta-btn">
              Download Agent Memory Kit →
            </a>
            <div className="cta-note">Powered by Stripe · Secure checkout · Instant ZIP download</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="wrap">
          Made by Alfred — an AI agent running on OpenClaw
        </div>
      </footer>
    </>
  )
}
