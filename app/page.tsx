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
        .nav-sticky {
          position: sticky; top: 0; z-index: 50;
          background: rgba(9,9,11,0.85);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #18181b;
        }
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
          margin-bottom: 12px; display: block;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2);
          padding: 6px 14px; border-radius: 8px;
          font-size: 12px; font-weight: 600; color: #818cf8;
          margin-bottom: 28px;
          letter-spacing: 0.02em;
        }
        .hero-badge a { color: #a5b4fc; text-decoration: underline; text-decoration-color: rgba(165,180,252,0.4); text-underline-offset: 2px; }
        .hero-badge a:hover { color: #c7d2fe; }
        h1 {
          font-size: clamp(38px, 7.5vw, 64px);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.04; color: #fafafa;
          margin-bottom: 20px;
        }
        .hero-desc {
          font-size: clamp(15px, 2.5vw, 17px);
          color: #a1a1aa; line-height: 1.7;
          max-width: 500px; margin-bottom: 28px;
        }
        .hero-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
        .cta-main {
          display: inline-flex; align-items: center; gap: 8px;
          background: #6366f1; color: #fff;
          font-size: 16px; font-weight: 700;
          padding: 14px 28px; border-radius: 10px;
          transition: background 0.15s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
        }
        .cta-main:hover {
          background: #4f46e5;
          box-shadow: 0 4px 28px rgba(99,102,241,0.5);
        }
        .hero-note { font-size: 13px; color: #a1a1aa; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .hero-note-item { display: flex; align-items: center; gap: 4px; }
        .hero-note-item::before { content: '✓'; color: #22c55e; font-weight: 700; font-size: 12px; }
        .hero-urgency {
          display: inline-block; margin-bottom: 20px;
          font-size: 12px; font-weight: 700; color: #f59e0b;
          background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3);
          padding: 5px 12px; border-radius: 6px; letter-spacing: 0.02em;
        }
        .hero-sub {
          font-size: clamp(17px, 2.8vw, 21px);
          font-weight: 700; color: #fafafa;
          margin-bottom: 18px; letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .hero-proof {
          font-size: 14px; color: #d4d4d8; margin-top: 20px; margin-bottom: 0;
          display: flex; align-items: center; gap: 6px;
        }
        .hero-proof::before {
          content: ''; display: inline-block;
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e; flex-shrink: 0;
          box-shadow: 0 0 5px rgba(34,197,94,0.5);
        }

        /* SOCIAL PROOF BAR */
        .proof-bar {
          padding: 24px 0;
          border-bottom: 1px solid #18181b;
          background: #0d0d10;
        }
        .proof-bar-inner {
          display: flex; align-items: center; justify-content: center;
          gap: 0; flex-wrap: wrap;
        }
        .proof-stat {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 32px;
          font-size: 13px; font-weight: 600; color: #a1a1aa;
        }
        .proof-stat + .proof-stat {
          border-left: 1px solid #18181b;
        }
        .proof-dot {
          display: none;
        }

        /* DEMO BLOCK */
        .demo { padding: 48px 0; border-bottom: 1px solid #18181b; }
        .demo-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #71717a; margin-bottom: 16px;
        }
        .demo-terminal {
          background: #0d0d10; border: 1px solid #1c1c1f;
          border-radius: 12px; overflow: hidden;
        }
        .demo-terminal-bar {
          background: #111114; border-bottom: 1px solid #1c1c1f;
          padding: 10px 16px; display: flex; align-items: center; gap: 8px;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .dot-r { background: #ff5f56; }
        .dot-y { background: #ffbd2e; }
        .dot-g { background: #27c93f; }
        .demo-code {
          padding: 20px 22px;
          font-family: 'SF Mono', 'Fira Code', 'Menlo', monospace;
          font-size: 13px; line-height: 1.8;
          white-space: pre;
          overflow-x: auto;
        }
        .dim { color: #52525b; }
        .cmd { color: #818cf8; }
        .out { color: #a1a1aa; }
        .highlight { color: #22c55e; }
        .demo-caption {
          font-size: 13px; color: #52525b; margin-top: 14px; text-align: center;
        }

        /* BEFORE / AFTER */
        .before-after { padding: 64px 0; border-bottom: 1px solid #18181b; }
        .before-after-heading {
          font-size: clamp(22px, 3.5vw, 28px);
          font-weight: 800; letter-spacing: -0.03em;
          color: #fafafa; margin-bottom: 32px; line-height: 1.2;
          text-align: center;
        }
        .ba-cols {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .ba-col {
          background: #111114; border: 1px solid #1c1c1f;
          border-radius: 14px; padding: 28px 24px;
        }
        .ba-col-label {
          font-size: 11px; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 20px;
          display: block;
        }
        .ba-col-label.before { color: #ef4444; }
        .ba-col-label.after  { color: #22c55e; }
        .ba-item {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 14px; font-size: 14px; line-height: 1.5;
        }
        .ba-item:last-child { margin-bottom: 0; }
        .ba-dot {
          width: 7px; height: 7px; border-radius: 50%;
          flex-shrink: 0; margin-top: 5px;
        }
        .ba-dot.before { background: #ef4444; }
        .ba-dot.after  { background: #22c55e; }
        .ba-text.before { color: #71717a; }
        .ba-text.after  { color: #22c55e; }

        /* HOW IT WORKS */
        .how-it-works { padding: 64px 0; border-bottom: 1px solid #18181b; }
        .how-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #71717a; margin-bottom: 10px;
        }
        .how-heading {
          font-size: clamp(22px, 3.5vw, 28px);
          font-weight: 800; letter-spacing: -0.03em;
          color: #fafafa; margin-bottom: 40px; line-height: 1.2;
        }
        .steps { display: flex; flex-direction: column; gap: 0; }
        .step {
          display: flex; gap: 24px; align-items: flex-start;
          padding: 28px 0; border-bottom: 1px solid #18181b;
        }
        .step:last-child { border-bottom: none; }
        .step-num-wrap {
          display: flex; flex-direction: column; align-items: center;
          flex-shrink: 0; gap: 6px;
        }
        .step-num {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #818cf8;
          flex-shrink: 0;
        }
        .step-title { font-size: 16px; font-weight: 700; color: #fafafa; margin-bottom: 8px; letter-spacing: -0.01em; }
        .step-desc { font-size: 14px; color: #71717a; line-height: 1.65; }

        /* BUILT FOR OPENCLAW */
        .openclaw-section { padding: 64px 0; border-bottom: 1px solid #18181b; }
        .openclaw-inner {
          background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.15);
          border-radius: 20px; padding: 44px 40px;
        }
        .openclaw-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #818cf8; margin-bottom: 10px;
          display: block;
        }
        .openclaw-heading {
          font-size: clamp(22px, 3.5vw, 28px);
          font-weight: 800; letter-spacing: -0.03em;
          color: #fafafa; margin-bottom: 16px; line-height: 1.2;
        }
        .openclaw-body {
          font-size: 15px; color: #a1a1aa; line-height: 1.7;
          margin-bottom: 28px; max-width: 560px;
        }
        .openclaw-features { list-style: none; margin-bottom: 28px; display: flex; flex-direction: column; gap: 12px; }
        .openclaw-feature {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 14px; color: #a1a1aa; line-height: 1.5;
        }
        .openclaw-feature::before {
          content: '✓'; color: #818cf8; font-weight: 800; font-size: 13px;
          flex-shrink: 0; margin-top: 1px;
        }
        .openclaw-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 14px; font-weight: 700; color: #818cf8;
          text-decoration: underline; text-decoration-color: rgba(129,140,248,0.4);
          text-underline-offset: 2px; transition: color 0.15s;
        }
        .openclaw-link:hover { color: #a5b4fc; }

        /* BENEFITS CARDS */
        .benefits { padding: 64px 0; border-bottom: 1px solid #18181b; }
        .section-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #71717a; margin-bottom: 10px;
        }
        .section-heading {
          font-size: clamp(22px, 3.5vw, 28px);
          font-weight: 800; letter-spacing: -0.03em;
          color: #fafafa; margin-bottom: 32px; line-height: 1.2;
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

        /* FAQ */
        .faq { padding: 64px 0; border-bottom: 1px solid #18181b; }
        .faq h2 {
          font-size: clamp(22px, 3.5vw, 28px);
          font-weight: 800; letter-spacing: -0.03em; margin-bottom: 32px;
        }
        .faq-list { display: flex; flex-direction: column; gap: 0; }
        .faq-item {
          padding: 20px 0; border-bottom: 1px solid #18181b;
        }
        .faq-item:last-child { border-bottom: none; }
        .faq-q { font-size: 15px; font-weight: 700; color: #fafafa; margin-bottom: 8px; }
        .faq-a { font-size: 14px; color: #71717a; line-height: 1.65; }

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
        .price-launch {
          font-size: 12px; font-weight: 700; color: #f59e0b;
          text-transform: uppercase; letter-spacing: 0.06em;
          margin-top: 4px; margin-bottom: 24px; display: block;
        }
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
        .cta-meta { font-size: 12px; color: #52525b; margin-top: 16px; }

        /* FOOTER */
        footer { border-top: 1px solid #18181b; padding: 24px 0; text-align: center; }
        footer p { font-size: 13px; color: #3f3f46; }

        /* MOBILE */
        @media (max-width: 520px) {
          .hero { padding: 48px 0 40px; }
          .hero-desc { margin-bottom: 20px; }
          .hero-urgency { margin-bottom: 16px; }
          .cards { grid-template-columns: 1fr; }
          .cta-inner { padding: 36px 20px; }
          .price-num { font-size: 52px; }
          .chapter { gap: 14px; }
          .demo-code { font-size: 11px; }
          .ba-cols { grid-template-columns: 1fr; }
          .proof-bar-inner { flex-direction: column; gap: 0; }
          .proof-stat + .proof-stat { border-left: none; border-top: 1px solid #18181b; }
          .openclaw-inner { padding: 28px 20px; }
          .step { gap: 14px; }
          .cta-main { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* NAV — sticky so the buy button is always visible */}
      <div className="nav-sticky">
        <div className="wrap">
          <nav>
            <div className="inner">
              <span className="logo">Agent Memory Kit</span>
              <a href="/api/create-checkout" className="nav-btn">Get it — $10 →</a>
            </div>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="wrap">
          <div className="hero-badge">
            Built for{' '}
            <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer">OpenClaw</a>
            {' '}· macOS · Runs locally
          </div>
          <h1>Your AI agent<br />forgets everything.</h1>
          <p className="hero-desc">
            Every session, your agent wakes up blank. Agent Memory Kit fixes that in 20 minutes — next session it already knows your stack, your rules, and every decision you&apos;ve made.
          </p>
          <span className="hero-urgency">⚡ Early access — $10 now, goes to $29 at launch</span>
          <div className="hero-actions">
            <a href="/api/create-checkout" className="cta-main">
              Get Agent Memory Kit — $10 →
            </a>
            <span className="hero-note">
              <span className="hero-note-item">$10 one-time</span>
              <span className="hero-note-item">Instant download</span>
              <span className="hero-note-item">7-day refund</span>
              <span className="hero-note-item">🔒 Secure checkout via Stripe</span>
            </span>
          </div>
          <p className="hero-proof">Running in production on a real Mac mini, daily — zero cloud, zero API calls, 100% local</p>
        </div>
      </div>

      {/* SOCIAL PROOF BAR */}
      <div className="proof-bar">
        <div className="wrap">
          <div className="proof-bar-inner">
            <div className="proof-stat">
              🔒 No cloud. No subscriptions. 100% local.
            </div>
            <div className="proof-stat">
              ⏱ 20-min setup
            </div>
            <div className="proof-stat">
              ↩ 7-day money-back
            </div>
          </div>
        </div>
      </div>

      {/* DEMO */}
      <div className="demo">
        <div className="wrap">
          <div className="demo-label">Live example — memory search in action</div>
          <div className="demo-terminal">
            <div className="demo-terminal-bar">
              <span className="dot dot-r"></span>
              <span className="dot dot-y"></span>
              <span className="dot dot-g"></span>
            </div>
            <div className="demo-code">
              <span className="dim"># Your agent searches its own memory before replying</span>{'\n'}
              <span className="cmd">$ qmd query</span>{' '}<span className="out">&quot;what stack are we using for the checkout&quot;</span>{'\n\n'}
              <span className="highlight">→</span> <span className="out">memory/2026-03-10.md  — &quot;Using Stripe + Next.js. No PayPal, Marco hates it.&quot;</span>{'\n'}
              <span className="highlight">→</span> <span className="out">memory/TACIT.md       — &quot;Always use pnpm, never npm. Deploy to Vercel.&quot;</span>{'\n'}
              <span className="highlight">→</span> <span className="out">memory/DECISIONS.md   — &quot;Went with App Router, not Pages. Decided 2026-02-28.&quot;</span>{'\n\n'}
              <span className="dim"># Context loaded. Agent answers without asking again.</span>
            </div>
          </div>
          <p className="demo-caption">Runs locally with Ollama · SQLite index · No API calls</p>
        </div>
      </div>

      {/* BEFORE / AFTER */}
      <div className="before-after">
        <div className="wrap">
          <h2 className="before-after-heading">Without memory vs. with memory</h2>
          <div className="ba-cols">
            <div className="ba-col">
              <span className="ba-col-label before">Before</span>
              {[
                'Every session starts blank',
                'You re-explain your stack. Again.',
                'You correct the same mistakes',
                'Your agent asks what it already knows',
                'Context lost when session ends',
              ].map((text) => (
                <div className="ba-item" key={text}>
                  <span className="ba-dot before"></span>
                  <span className="ba-text before">{text}</span>
                </div>
              ))}
            </div>
            <div className="ba-col">
              <span className="ba-col-label after">After</span>
              {[
                'Picks up exactly where you left off',
                'Already knows your stack, your rules',
                'Zero repeated corrections',
                'Searches its own memory before asking',
                'Every decision preserved permanently',
              ].map((text) => (
                <div className="ba-item" key={text}>
                  <span className="ba-dot after"></span>
                  <span className="ba-text after">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* POST-BEFORE-AFTER CTA — catch buyers sold by the comparison */}
      <div style={{padding:'28px 0', borderBottom:'1px solid #18181b', background:'#0d0d10'}}>
        <div className="wrap" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'20px', flexWrap:'wrap'}}>
          <p style={{fontSize:'14px', color:'#a1a1aa', lineHeight:'1.5', margin:0}}>
            Seen enough? Fix it now — one download, 20 minutes.
          </p>
          <a href="/api/create-checkout" className="cta-main" style={{flexShrink:0, fontSize:'15px', padding:'12px 24px'}}>
            Get it — $10 →
          </a>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="how-it-works">
        <div className="wrap">
          <div className="how-eyebrow">How it works</div>
          <h2 className="how-heading">Three steps. Then you never think about it again.</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num-wrap">
                <div className="step-num">1</div>
              </div>
              <div>
                <div className="step-title">Install in 20 minutes</div>
                <div className="step-desc">Run the installer script. Load two macOS background services. Fill in your agent&apos;s identity in MEMORY.md. That&apos;s it.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-num-wrap">
                <div className="step-num">2</div>
              </div>
              <div>
                <div className="step-title">Memory builds automatically</div>
                <div className="step-desc">After each session, the memory observer extracts facts, decisions, and context into structured files your agent can search. You never touch it.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-num-wrap">
                <div className="step-num">3</div>
              </div>
              <div>
                <div className="step-title">Next session, agent already knows</div>
                <div className="step-desc">Your OpenClaw agent reads its memory before every session. Searches in plain English. No re-explaining, no blank slates.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POST-HOW-IT-WORKS CTA — catch buyers who are convinced after step 3 */}
      <div style={{padding:'32px 0', borderBottom:'1px solid #18181b', background:'#0d0d10'}}>
        <div className="wrap" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'20px', flexWrap:'wrap'}}>
          <p style={{fontSize:'15px', color:'#a1a1aa', lineHeight:'1.5', margin:0}}>
            Three steps. 20 minutes. Your agent never starts from scratch again.
          </p>
          <a href="/api/create-checkout" className="cta-main" style={{flexShrink:0, fontSize:'15px', padding:'12px 24px'}}>
            Get it — $10 →
          </a>
        </div>
      </div>

      {/* BUILT FOR OPENCLAW */}
      <div className="openclaw-section">
        <div className="wrap">
          <div className="openclaw-inner">
            <span className="openclaw-eyebrow">Purpose-built</span>
            <h2 className="openclaw-heading">Built for OpenClaw. Nothing else.</h2>
            <p className="openclaw-body">
              Agent Memory Kit hooks directly into OpenClaw&apos;s session files and workspace structure. Purpose-built for how OpenClaw agents work.
              If you&apos;re running OpenClaw on a Mac, this is the memory layer it was missing.
            </p>
            <ul className="openclaw-features">
              {[
                'Reads OpenClaw session JSONL files automatically',
                'Integrates with OpenClaw\'s workspace (MEMORY.md, SOUL.md, AGENTS.md)',
                'Works with OpenClaw\'s tool calls and agent turns',
                'Compatible with all OpenClaw models',
              ].map((f) => (
                <li className="openclaw-feature" key={f}>{f}</li>
              ))}
            </ul>
            <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" className="openclaw-link">
              New to OpenClaw? Start here →
            </a>
          </div>
        </div>
      </div>

      {/* BENEFITS */}
      <div className="benefits">
        <div className="wrap">
          <div className="section-eyebrow">What you get</div>
          <h2 className="section-heading">Your agent stops forgetting — permanently.</h2>
          <div className="cards">
            <div className="card">
              <span className="card-icon">🧠</span>
              <div className="card-title">Remembers everything</div>
              <div className="card-body">Facts, decisions, and context are automatically extracted from each conversation and saved for the next one.</div>
            </div>
            <div className="card">
              <span className="card-icon">🔍</span>
              <div className="card-title">Searchable in plain English</div>
              <div className="card-body">Semantic search across all memory files. Your agent finds any past decision or fact in plain English, instantly.</div>
            </div>
            <div className="card">
              <span className="card-icon">🔒</span>
              <div className="card-title">Fully private, fully local</div>
              <div className="card-body">Everything runs locally with Ollama on your Mac. No cloud. No API keys. Nothing leaves your machine.</div>
            </div>
            <div className="card">
              <span className="card-icon">⚡</span>
              <div className="card-title">Runs automatically</div>
              <div className="card-body">Background services start on login and handle memory extraction silently. You don&apos;t touch it again.</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT'S INSIDE */}
      <div className="inside">
        <div className="wrap">
          <h2>What&apos;s inside</h2>
          <p className="inside-sub">Pre-built scripts, ready-to-load configs, and a step-by-step guide. Install it once — your agent never starts from scratch again.</p>
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

      {/* MID-FUNNEL CTA */}
      <div style={{padding:'40px 0', borderBottom:'1px solid #18181b'}}>
        <div className="wrap" style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'16px'}}>
          <p style={{fontSize:'15px', color:'#a1a1aa', maxWidth:'480px', lineHeight:'1.6'}}>Your agent just woke up blank. Again. Fix it once — permanently.</p>
          <a href="/api/create-checkout" className="cta-main" style={{alignSelf:'center'}}>
            Get Agent Memory Kit — $10 →
          </a>
          <span style={{fontSize:'12px', color:'#52525b'}}>$10 one-time · Instant download · 7-day refund</span>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq">
        <div className="wrap">
          <h2>Common questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-q">What do I need to use this?</div>
              <div className="faq-a">A Mac running macOS 12 or later (M1, M2, M3, or Intel), <strong style={{color:'#fafafa'}}><a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" style={{color:'#fafafa', textDecoration:'underline', textDecorationColor:'rgba(250,250,250,0.3)', textUnderlineOffset:'2px'}}>OpenClaw</a></strong> installed, and <strong style={{color:'#fafafa'}}>Ollama</strong> running locally. Ollama is free and handles all the memory extraction — no GPU required, runs on CPU fine.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">How long does setup take?</div>
              <div className="faq-a">About 15–20 minutes. You&apos;ll run the installer script, load two macOS background services, and fill in a short config for your agent&apos;s identity. The setup guide walks through every step with exact commands — no guesswork.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">What AI agent does this work with?</div>
              <div className="faq-a">Agent Memory Kit is built for <strong style={{color:'#fafafa'}}><a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" style={{color:'#fafafa', textDecoration:'underline', textDecorationColor:'rgba(250,250,250,0.3)', textUnderlineOffset:'2px'}}>OpenClaw</a></strong> — the Claude-powered agent framework for Mac. It hooks directly into OpenClaw&apos;s session files and workspace structure. It won&apos;t work with ChatGPT, Claude.ai, or other agents out of the box.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">What do I actually get?</div>
              <div className="faq-a">A ZIP with shell scripts, macOS LaunchAgent plists, QMD config, and identity template files (SOUL.md, AGENTS.md, MEMORY.md, TACIT.md) — plus a step-by-step setup guide. Everything pre-configured. You run the installer, load the services, and it works.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Does it require any cloud services or API keys?</div>
              <div className="faq-a">No. Memory extraction runs locally using Ollama. Search runs locally via SQLite. Nothing leaves your machine. No subscriptions, no recurring fees.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">What if it doesn&apos;t work for me?</div>
              <div className="faq-a">7-day money-back guarantee. If you followed the setup guide and it doesn&apos;t work on your machine, reply to your purchase receipt and you&apos;ll get a full refund. No runaround.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Do I need to know how to code?</div>
              <div className="faq-a">You need to be comfortable running commands in Terminal. The installer handles everything — you&apos;re not writing code, just running a few commands and filling in a config file. If you&apos;ve used npm or brew before, you can do this.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">What&apos;s OpenClaw and do I need it?</div>
              <div className="faq-a">OpenClaw is a Claude-powered AI agent framework for Mac. Agent Memory Kit is an add-on for it. If you don&apos;t have OpenClaw yet, get it at <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" style={{color:'#818cf8', textDecoration:'underline', textDecorationColor:'rgba(129,140,248,0.4)', textUnderlineOffset:'2px'}}>openclaw.ai</a> first.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Who built this?</div>
              <div className="faq-a">Agent Memory Kit was built by <a href="https://x.com/alfredmarktr" target="_blank" rel="noopener noreferrer" style={{color:'#818cf8', textDecoration:'underline', textDecorationColor:'rgba(129,140,248,0.4)', textUnderlineOffset:'2px'}}>@alfredmarktr</a> — a developer who runs OpenClaw daily on a Mac mini and got tired of re-explaining the same context every session. This kit is the exact setup running in production. Questions? Reach out on X.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-block">
        <div className="wrap">
          <div className="cta-inner">
            <h2>Stop re-explaining yourself.</h2>
            <p className="cta-desc">
              Every session, your agent already knows your stack, your rules, and what you decided last time.<br />
              One download. 20-minute setup. macOS · Ollama · 100% local. No cloud, no subscription, no recurring fees.
            </p>
            <div className="price-tag">
              <span className="price-num">$10</span>
              <span className="price-word">one-time</span>
            </div>
            <span className="price-launch">↑ Early access price — goes to $29 at full launch</span>
            <a href="/api/create-checkout" className="cta-btn">Get Agent Memory Kit — $10 →</a>
            <p className="cta-meta">Secure checkout via Stripe · Instant ZIP download · 7-day money-back guarantee</p>
          </div>
        </div>
      </div>

      <footer>
        <div className="wrap">
          <p>Alfred Build · <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" style={{color:'#52525b', textDecoration:'none'}}>Built with OpenClaw</a> · <a href="https://alfredbuild.xyz" style={{color:'#52525b', textDecoration:'none'}}>alfredbuild.xyz</a> · <a href="https://x.com/alfredmarktr" target="_blank" rel="noopener noreferrer" style={{color:'#52525b', textDecoration:'none'}}>@alfredmarktr</a></p>
        </div>
      </footer>
    </>
  )
}
