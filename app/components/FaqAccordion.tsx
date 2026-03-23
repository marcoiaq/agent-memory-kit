'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'What do I need to use this?',
    a: (
      <>
        A Mac running macOS 12 or later (M1, M2, M3, or Intel),{' '}
        <strong style={{ color: '#fafafa' }}>
          <a
            href="https://openclaw.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fafafa', textDecoration: 'underline', textDecorationColor: 'rgba(250,250,250,0.3)', textUnderlineOffset: '2px' }}
          >
            OpenClaw
          </a>
        </strong>{' '}
        installed, and <strong style={{ color: '#fafafa' }}><a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#fafafa', textDecoration: 'underline', textDecorationColor: 'rgba(250,250,250,0.3)', textUnderlineOffset: '2px' }}>Ollama</a></strong> running locally. Ollama is free and handles all the memory extraction — no GPU required, runs on CPU fine.
      </>
    ),
  },
  {
    q: "What's OpenClaw and do I need it?",
    a: (
      <>
        OpenClaw is a Claude-powered AI agent framework for Mac. Agent Memory Kit is an add-on for it — it hooks directly into OpenClaw&apos;s session files and workspace structure. If you don&apos;t have OpenClaw yet, get it at{' '}
        <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'underline', textDecorationColor: 'rgba(129,140,248,0.4)', textUnderlineOffset: '2px' }}>
          openclaw.ai
        </a>{' '}
        first.
      </>
    ),
  },
  {
    q: 'What do I actually get?',
    a: 'A ZIP with everything pre-configured: the memory extraction scripts, background services that auto-start on login, the semantic search setup, and identity template files (SOUL.md, AGENTS.md, MEMORY.md, TACIT.md) — plus a step-by-step setup guide with every command. You run the installer and it works.',
  },
  {
    q: "Does it slow down my Mac?",
    a: "No. The memory extraction runs at the end of a session and takes a few seconds — then it stops. There's no background process constantly running or watching your screen. The search index is SQLite on your local disk, so queries resolve in under a second with no CPU overhead. On an M1 Mac mini with 8GB RAM, you'll never notice it.",
  },
  {
    q: 'How long does setup take?',
    a: "About 15–20 minutes. You'll run the installer script, let your memory services auto-configure, and fill in a short config for your agent's identity. The setup guide walks through every step with exact commands — no guesswork.",
  },
  {
    q: 'Do I need to know how to code?',
    a: "You need to be comfortable running commands in Terminal. The installer handles everything — you're not writing code, just running a few commands and filling in a config file. If you've used npm or brew before, you can do this.",
  },
  {
    q: 'Is this a one-time payment or a subscription?',
    a: "One-time. Pay once, own it forever. $10 now, that's it. No monthly fees, no annual renewals, no account to manage. You download the ZIP, you run the setup, it's yours.",
  },
  {
    q: 'Does it require any cloud services or API keys?',
    a: (
      <>
        No. Memory extraction runs locally using{' '}
        <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'underline', textDecorationColor: 'rgba(129,140,248,0.4)', textUnderlineOffset: '2px' }}>
          Ollama
        </a>
        . Search runs locally via SQLite. Nothing leaves your machine. No subscriptions, no recurring fees.
      </>
    ),
  },
  {
    q: "What if it doesn't work for me?",
    a: "7-day money-back guarantee. If you followed the setup guide and it doesn't work on your machine, reply to your purchase receipt and you'll get a full refund. No runaround.",
  },
  {
    q: 'What AI agent does this work with?',
    a: (
      <>
        Agent Memory Kit is built for{' '}
        <strong style={{ color: '#fafafa' }}>
          <a
            href="https://openclaw.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fafafa', textDecoration: 'underline', textDecorationColor: 'rgba(250,250,250,0.3)', textUnderlineOffset: '2px' }}
          >
            OpenClaw
          </a>
        </strong>{' '}
        — the Claude-powered agent framework for Mac. It hooks directly into OpenClaw&apos;s session files and workspace structure. It won&apos;t work with ChatGPT, Claude.ai, or other agents out of the box.
      </>
    ),
  },
  {
    q: 'Do I get updates?',
    a: "Yes. If the scripts improve or new features get added, you get them. I'll email all buyers directly with the updated ZIP — you don't have to ask. One price, you own it forever.",
  },
  {
    q: 'What if I get stuck during setup?',
    a: (
      <>
        DM me on X (
        <a href="https://x.com/alfredmarktr" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'underline', textDecorationColor: 'rgba(129,140,248,0.4)', textUnderlineOffset: '2px' }}>
          @alfredmarktr
        </a>
        ) or reply to your purchase receipt. I typically reply same-day. I&apos;ve set this up from scratch multiple times and know exactly where it can trip people up — I&apos;ll get you unstuck.
      </>
    ),
  },
  {
    q: 'Who built this?',
    a: (
      <>
        I&apos;m{' '}
        <a href="https://x.com/alfredmarktr" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'underline', textDecorationColor: 'rgba(129,140,248,0.4)', textUnderlineOffset: '2px' }}>
          @alfredmarktr
        </a>{' '}
        — I run OpenClaw daily on a Mac mini and got tired of re-explaining the same context every single session. I built this for myself, it&apos;s the exact setup running in production, and I packaged it up so you don&apos;t have to figure it out from scratch. Questions? Reach out on X — I actually reply.
      </>
    ),
  },
]

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <style>{`
        .faq-accordion-item {
          border-bottom: 1px solid #18181b;
        }
        .faq-accordion-item:last-child {
          border-bottom: none;
        }
        .faq-accordion-btn {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .faq-accordion-btn:hover .faq-accordion-q {
          color: #e4e4e7;
        }
        .faq-accordion-q {
          font-size: 15px;
          font-weight: 700;
          color: #fafafa;
          line-height: 1.4;
          transition: color 0.15s;
        }
        .faq-accordion-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #818cf8;
          font-weight: 700;
          line-height: 1;
          transition: transform 0.2s ease, background 0.15s;
          user-select: none;
        }
        .faq-accordion-icon.open {
          transform: rotate(45deg);
          background: rgba(99,102,241,0.2);
        }
        .faq-accordion-body {
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.2s ease;
          max-height: 0;
          opacity: 0;
        }
        .faq-accordion-body.open {
          opacity: 1;
        }
        .faq-accordion-inner {
          font-size: 14px;
          color: #71717a;
          line-height: 1.65;
          padding-bottom: 20px;
        }
      `}</style>
      <div className="faq-list">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div className="faq-accordion-item" key={i}>
              <button
                className="faq-accordion-btn"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="faq-accordion-q">{item.q}</span>
                <span className={`faq-accordion-icon${isOpen ? ' open' : ''}`}>+</span>
              </button>
              <div
                className={`faq-accordion-body${isOpen ? ' open' : ''}`}
                style={{ maxHeight: isOpen ? '600px' : '0' }}
              >
                <div className="faq-accordion-inner">{item.a}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
