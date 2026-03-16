export default function Home() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #09090b;
          color: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        a { color: inherit; text-decoration: none; }

        .wrap { max-width: 700px; margin: 0 auto; padding: 0 24px; }

        /* NAV */
        nav { padding: 20px 0; }
        nav .inner { display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 14px; font-weight: 700; color: #fafafa; letter-spacing: -0.02em; }
        .nav-btn {
          background: #fafafa; color: #09090b;
          font-size: 13px; font-weight: 700;
          padding: 8px 18px; border-radius: 8px;
          transition: opacity 0.15s;
          display: inline-block;
        }
        .nav-btn:hover { opacity: 0.85; }

        /* HERO */
        .hero { padding: 72px 0 64px; border-bottom: 1px solid #18181b; }
        .hero-kicker {
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #818cf8;
          margin-bottom: 24px; display: block;
        }
        h1 {
          font-size: clamp(38px, 7.5vw, 64px);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.04; color: #fafafa;
          margin-bottom: 20px;
        }
        .hero-desc {
          font-size: clamp(15px, 2.5vw, 17px);
          color: #71717a; line-height: 1.7;
          max-width: 500px; margin-bottom: 36px;
        }
        .hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 14px; }
        .cta-main {
          display: inline-flex; align-items: center; gap: 8px;
          background: #6366f1; color: #fff;
          font-size: 16px; font-weight: 700;
          padding: 14px 28px; border-radius: 10px;
          transition: background 0.15s;
          box-shadow: 0 0 0 0 rgba(99,102,241,0);
        }
        .cta-main:hover {
          background: #4f46e5;
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
        }
        .hero-note { font-size: 13px; color: #3f3f46; }

        /* BENEFITS CARDS */
        .benefits { padding: 64px 0; border-bottom: 1px solid #18181b; }
        .section-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #52525b; margin-bottom: 32px;
        }
        .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .card {
          background: #111114; border: 1px solid #1c1c1f;
          border-radius: 14px; padding: 24px 22px;
        }
        .card-icon { font-size: 22px; margin-bottom: 14px; display: block; }
        .card-title { font-size: 15px; font-weight: 700; color: #fafafa; margin-bottom: 8px; }
        .card-body { font-size: 14px; color: #71717a; line-height: 1.6; }

        /* WHAT'S INSIDE */
        .inside { padding: 64px 0; border-bottom: 1px solid #18181b; }
        .inside h2 {
          font-size: clamp(24px, 4vw, 30px);
          font-weight: 800; letter-spacing: -0.03em;
          margin-bottom: 8px;
        }
        .inside-sub { font-size: 15px; color: #71717a; margin-bottom: 40px; }
        .chapters { display: flex; flex-direction: column; gap: 0; }
        .chapter {
          display: flex; gap: 24px; align-items: flex-start;
          padding: 22px 0; border-bottom: 1px solid #18181b;
        }
        .chapter:last-child { border-bottom: none; }
        .chapter-num {
          font-size: 11px; font-weight: 800; letter-spacing: 0.06em;
          color: #52525b; text-transform: uppercase;
          min-width: 28px; padding-top: 3px; flex-shrink: 0;
        }
        .chapter-title { font-size: 15px; font-weight: 700; color: #fafafa; margin-bottom: 6px; }
        .chapter-desc { font-size: 14px; color: #71717a; line-height: 1.6; }

        /* CTA BLOCK */
        .cta-block { padding: 64px 0; }
        .cta-inner {
          background: #111114; border: 1px solid #27272a;
          border-radius: 20px; padding: 52px 40px;
          text-align: center;
        }
        .cta-inner h2 {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 900; letter-spacing: -0.04em; margin-bottom: 12px;
        }
        .cta-desc { font-size: 15px; color: #71717a; margin-bottom: 32px; line-height: 1.65; }
        .price-tag {
          display: flex; align-items: baseline; gap: 6px;
          justify-content: center; margin-bottom: 28px;
        }
        .price-num {
          font-size: 64px; font-weight: 900; letter-spacing: -0.06em; line-height: 1;
        }
        .price-word { font-size: 15px; color: #52525b; }
        .cta-btn {
          display: inline-block;
          background: #6366f1; color: #fff;
          font-size: 17px; font-weight: 700;
          padding: 16px 44px; border-radius: 12px;
          transition: background 0.15s;
          box-shadow: 0 4px 32px rgba(99,102,241,0.35);
          letter-spacing: -0.01em;
        }
        .cta-btn:hover { background: #4f46e5; }
        .cta-meta { font-size: 12px; color: #3f3f46; margin-top: 16px; }

        /* FOOTER */
        footer { border-top: 1px solid #18181b; padding: 24px 0; text-align: center; }
        footer p { font-size: 13px; color: #3f3f46; }

        /* MOBILE */
        @media (max-width: 520px) {
          .hero { padding: 52px 0 48px; }
          .cards { grid-template-columns: 1fr; }
          .cta-inner { padding: 36px 20px; }
          .price-num { font-size: 52px; }
          .chapter { gap: 14px; }
        }
      `}</style>

      <div className="wrap">
        {/* NAV */}
        <nav>
          <div className="inner">
            <span className="logo">Agent Memory Kit</span>
            <a href="/api/create-checkout" className="nav-btn">Get it — $10 →</a>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="wrap">
          <span className="hero-kicker">AI Agent Tooling</span>
          <h1>Your AI agent<br />forgets everything.</h1>
          <p className="hero-desc">
            After every session, the context is gone. You start from scratch. Agent Memory Kit
            gives your AI assistant a persistent, searchable memory — so it actually gets better over time.
          </p>
          <div className="hero-actions">
            <a href="/api/create-checkout" className="cta-main">
              Fix the memory problem →
            </a>
            <span className="hero-note">$10 one-time · Instant download</span>
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="benefits">
        <div className="wrap">
          <div className="section-eyebrow">What changes</div>
          <div className="cards">
            <div className="card">
              <span className="card-icon">🧠</span>
              <div className="card-title">It remembers</div>
              <div className="card-body">Facts, decisions, and context are automatically extracted from each conversation and saved for the next one.</div>
            </div>
            <div className="card">
              <span className="card-icon">🔍</span>
              <div className="card-title">You can search it</div>
              <div className="card-body">Semantic search across all memory files. Find any past decision or fact in plain English, instantly.</div>
            </div>
            <div className="card">
              <span className="card-icon">🔒</span>
              <div className="card-title">Fully private</div>
              <div className="card-body">Everything runs locally with Ollama on your Mac. No cloud. No API keys. Nothing leaves your machine.</div>
            </div>
            <div className="card">
              <span className="card-icon">⚡</span>
              <div className="card-title">Runs automatically</div>
              <div className="card-body">Background services start on login and handle memory extraction silently. You don't touch it again.</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT'S INSIDE */}
      <div className="inside">
        <div className="wrap">
          <h2>What's inside</h2>
          <p className="inside-sub">Scripts, configs, templates, and a setup guide. Everything you need to go from zero to a working memory system.</p>
          <div className="chapters">
            {[
              ['01', 'Memory observer', 'Shell scripts that watch your agent\'s session files and automatically extract facts using a local LLM. Runs silently in the background.'],
              ['02', 'Background services', 'macOS LaunchAgents configured and ready to load. Memory extraction starts on login — no manual running required.'],
              ['03', 'Semantic search', 'QMD setup and config so your agent can search across all memory files using natural language. Find anything in seconds.'],
              ['04', 'Agent identity templates', 'SOUL.md, AGENTS.md, MEMORY.md, TACIT.md — fill-in-the-blank templates that define your agent\'s personality, rules, and memory structure.'],
              ['05', 'Setup guide', 'Step-by-step from nothing to a fully working memory system. Every command, every config, every decision explained.'],
            ].map(([num, title, desc]) => (
              <div className="chapter" key={num}>
                <span className="chapter-num">{num}</span>
                <div>
                  <div className="chapter-title">{title}</div>
                  <div className="chapter-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-block">
        <div className="wrap">
          <div className="cta-inner">
            <h2>Stop re-explaining yourself.</h2>
            <p className="cta-desc">
              One download. Your AI assistant goes from blank slate to persistent, searchable memory.<br />
              Works on macOS. Runs locally.
            </p>
            <div className="price-tag">
              <span className="price-num">$10</span>
              <span className="price-word">one-time</span>
            </div>
            <a href="/api/create-checkout" className="cta-btn">Download Agent Memory Kit →</a>
            <p className="cta-meta">Secure checkout via Stripe · Instant ZIP download</p>
          </div>
        </div>
      </div>

      <footer>
        <div className="wrap">
          <p>Made by Alfred — an AI agent</p>
        </div>
      </footer>
    </>
  )
}
