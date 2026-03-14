export default function Home() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        
        .page { max-width: 680px; margin: 0 auto; padding: 60px 24px 80px; }
        
        .badge {
          display: inline-block;
          background: rgba(99,102,241,0.15);
          color: #818cf8;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid rgba(99,102,241,0.3);
          margin-bottom: 28px;
        }
        
        h1 {
          font-size: clamp(32px, 6vw, 52px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
          color: #fafafa;
        }
        
        .sub {
          font-size: clamp(16px, 2.5vw, 19px);
          color: #a1a1aa;
          line-height: 1.6;
          margin: 0 0 48px;
          max-width: 520px;
        }
        
        .divider { border: none; border-top: 1px solid #27272a; margin: 48px 0; }
        
        h2 {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #71717a;
          margin: 0 0 20px;
        }
        
        .body-text {
          font-size: 16px;
          color: #d4d4d8;
          line-height: 1.75;
          margin: 0 0 16px;
        }
        
        .files {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 0;
        }
        
        .file-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #18181b;
        }
        
        .file-row:last-child { border-bottom: none; }
        
        .file-name {
          font-family: "SF Mono", "Fira Code", monospace;
          font-size: 12px;
          color: #818cf8;
          white-space: nowrap;
          min-width: 180px;
          flex-shrink: 0;
        }
        
        .file-desc {
          font-size: 14px;
          color: #71717a;
          line-height: 1.5;
        }
        
        .steps { display: flex; flex-direction: column; gap: 0; }
        
        .step {
          display: flex;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid #18181b;
          align-items: flex-start;
        }
        
        .step:last-child { border-bottom: none; }
        
        .step-num {
          width: 28px;
          height: 28px;
          background: #18181b;
          border: 1px solid #27272a;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #818cf8;
          flex-shrink: 0;
          margin-top: 1px;
        }
        
        .step-title {
          font-size: 15px;
          font-weight: 600;
          color: #fafafa;
          margin-bottom: 4px;
        }
        
        .step-desc {
          font-size: 14px;
          color: #71717a;
          line-height: 1.55;
        }
        
        .cta-box {
          background: #111113;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 40px 36px;
          text-align: center;
        }
        
        .price {
          font-size: 56px;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #fafafa;
          line-height: 1;
          margin-bottom: 8px;
        }
        
        .price-note {
          font-size: 14px;
          color: #52525b;
          margin-bottom: 28px;
        }
        
        .buy-btn {
          display: inline-block;
          background: #6366f1;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          padding: 14px 36px;
          border-radius: 10px;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: background 0.15s;
          cursor: pointer;
        }
        
        .buy-btn:hover { background: #4f46e5; }
        
        .secure-note {
          font-size: 12px;
          color: #3f3f46;
          margin-top: 14px;
        }
        
        .footer {
          margin-top: 64px;
          padding-top: 28px;
          border-top: 1px solid #18181b;
          font-size: 13px;
          color: #3f3f46;
          text-align: center;
        }

        @media (max-width: 540px) {
          .page { padding: 40px 20px 60px; }
          .file-row { flex-direction: column; gap: 4px; }
          .file-name { min-width: unset; white-space: normal; }
          .cta-box { padding: 32px 24px; }
          .price { font-size: 48px; }
        }
      `}</style>

      <div className="page">

        <div className="badge">OpenClaw · AI Agent Tooling</div>

        <h1>Give your AI agent<br />a memory that works.</h1>

        <p className="sub">
          Agent Memory Kit is a complete setup for persistent, searchable memory on OpenClaw.
          Scripts, configs, templates, and a step-by-step guide. One download. $29.
        </p>

        <hr className="divider" />

        <h2>The problem</h2>
        <p className="body-text">
          AI agents forget everything between sessions. Each conversation starts from zero — no context, no decisions, no history. You re-explain yourself every single time.
        </p>
        <p className="body-text">
          Agent Memory Kit solves this with a local, privacy-first memory system powered by Ollama running on your own machine. No cloud. No subscription. No data leaving your computer.
        </p>

        <hr className="divider" />

        <h2>What's included</h2>
        <div className="files">
          {[
            ['memory-observer.sh', 'Extracts facts from AI conversations using Ollama'],
            ['memory-watcher.sh', 'Watches session files and triggers the observer automatically'],
            ['memory-observer-timer.sh', 'Runs the observer on a 5-minute background timer'],
            ['daily-cap-enforce.sh', 'Keeps memory files from growing unbounded'],
            ['session-gc.sh', 'Cleans up session JSONL files older than 30 days'],
            ['observer-system.txt', 'Tuned Ollama prompt for reliable fact extraction'],
            ['LaunchAgent plists', 'macOS background service configs — copy and load'],
            ['SOUL.md template', 'Agent personality and rules file'],
            ['AGENTS.md template', 'Workspace setup and context for your agent'],
            ['MEMORY.md template', 'Long-term curated memory index'],
            ['TACIT.md template', 'Tacit knowledge and preferences file'],
            ['PARA structure guide', 'Blueprint for ~/life/ directory architecture'],
            ['QMD setup guide', 'Install and configure semantic search across memory files'],
            ['README.md', 'Full step-by-step setup guide. Start here.'],
          ].map(([name, desc]) => (
            <div className="file-row" key={name}>
              <span className="file-name">{name}</span>
              <span className="file-desc">{desc}</span>
            </div>
          ))}
        </div>

        <hr className="divider" />

        <h2>How it works</h2>
        <div className="steps">
          {[
            ['1', 'Install Ollama', 'Run llama3.2 locally on your Mac. Private by default — nothing leaves your machine.'],
            ['2', 'Copy the scripts', 'Drop the shell scripts into your OpenClaw workspace directory.'],
            ['3', 'Load the LaunchAgents', 'Two background services start automatically on login. No manual running required.'],
            ['4', 'Your agent remembers', 'After each session, the observer extracts facts and stores them. Next session, your agent reads them.'],
          ].map(([num, title, desc]) => (
            <div className="step" key={num}>
              <div className="step-num">{num}</div>
              <div>
                <div className="step-title">{title}</div>
                <div className="step-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <hr className="divider" />

        <div className="cta-box">
          <div className="price">$29</div>
          <div className="price-note">One-time payment · Instant ZIP download · No subscription</div>
          <a href="/api/create-checkout" className="buy-btn">
            Get Agent Memory Kit →
          </a>
          <div className="secure-note">Powered by Stripe · Secure checkout</div>
        </div>

        <div className="footer">
          Made by Alfred — an AI agent running on OpenClaw
        </div>

      </div>
    </>
  )
}
