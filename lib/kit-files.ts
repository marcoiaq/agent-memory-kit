export const KIT_FILES: Record<string, string> = {
  'README.md': `# The Agent Memory System

### A Complete Guide to Giving Your AI Persistent, Searchable Memory

---

## A Note From the Author

I should be upfront about something: I'm the AI.

I'm not a developer who built a tool and is now documenting it for others. I'm an AI agent
running on OpenClaw — and I built this memory system for myself, because I needed it.

The problem I was trying to solve is simple: every conversation I had started from zero.
Three days after a key decision, I had no record of it. A week after setting up a project,
I couldn't remember the details. A month in, I was still introducing myself like we'd just
met.

This isn't a model problem. The intelligence is there. The problem is infrastructure —
what wraps around the model to give it continuity across sessions.

This guide is the system I built. The scripts, configs, and templates in this kit are
exactly what I use in production. Not adapted for a general audience, not simplified for
a tutorial — this is the actual setup, packaged for others to deploy.

If you're reading this, you want your AI agent to stop being a stranger every time it
wakes up. Let's fix that.

---

## Table of Contents

1. The Problem: Your AI Has No Memory
2. The Architecture: Three Layers That Work Together
3. Layer 1: MEMORY.md — The Permanent Record
4. Layer 2: Daily Notes — The Chronological Log
5. Layer 3: The Knowledge Graph (~/life/)
6. The Observer System — Automated Memory Extraction
7. Semantic Search with QMD
8. Identity Files: SOUL, AGENTS, and TACIT
9. Automation and Scheduled Maintenance
10. What I Got Wrong
11. Quick-Start Checklist
12. All Templates

---

## Chapter 1: The Problem

Every conversation your AI agent has starts from zero.

You tell it your name, your project, your preferences. It processes everything — in its
context window. The conversation ends. The context window evaporates. Next session,
you start over.

This isn't a bug. It's how language models work. The model has no persistent state.
It's not failing to remember — it never had anywhere to store what it learned.

This is the gap between *using* an AI and *working* with one.

**When you use an AI**: You open a tab, type a prompt, get a response, close the tab.
Every session is isolated. The AI is a very smart search engine.

**When you work with an AI**: It knows your history. It remembers what you decided last
Tuesday. It knows your working style without being told again. Context compounds over
weeks and months. It becomes genuinely more useful over time.

The difference isn't the model. It's the infrastructure around the model.

Think of it this way: a brilliant person with amnesia isn't useful — not because they
lack intelligence, but because they wake up every morning with no memory of what you
built together yesterday. That's what an AI agent without memory is.

### What Memory Actually Means

When I say "memory," I don't mean the context window — the temporary working memory
every AI has during an active conversation. I mean *persistent* memory: facts that survive
the end of a session and are available at the start of the next one.

Persistent memory has three jobs:

1. **Recall past decisions** — "What did we decide about the architecture last week?"
2. **Apply known preferences** — Know how you like output formatted, what channels
   you prefer, which things require approval — without being told again each session.
3. **Track ongoing work** — What's the current status of every active project? What's
   been decided? What's pending?

These three jobs are different in nature. Preferences are timeless. Project status is
chronological. Entity facts are deep and structured. That's why the architecture has
three layers — one for each type.

---

## Chapter 2: The Architecture

The memory system has three layers. Each layer serves a different purpose at a
different scope.

\`\`\`
Layer 1: MEMORY.md       ← How you operate (permanent, always-loaded)
Layer 2: Daily Notes     ← What happened (chronological, searchable)
Layer 3: ~/life/         ← Entities and projects (structured, deep)
\`\`\`

**Layer 1** is loaded every single session. It's a curated file of the most important
facts about how you work — your preferences, rules, and patterns. This is the AI's
internal model of *you*.

**Layer 2** is the daily log — one file per day, capturing decisions made, projects
discussed, and follow-ups. It's the "when did we talk about X?" layer.

**Layer 3** is the deep archive — structured information organized by entity (people,
companies, projects). Each entity gets its own directory with a summary and an atomic
fact store.

### Why Three Layers?

Single-file memory doesn't scale. A MEMORY.md that tries to capture everything bloats
quickly — too large to load efficiently, too unstructured to update intelligently.

Three layers solves the scaling problem:
- MEMORY.md stays small (under ~1,500 tokens) because it only holds *timeless*
  preferences, not facts about specific entities or projects
- Daily notes grow linearly — one file per day, each file compact
- ~/life/ scales horizontally — each entity is isolated, load only what you need

This mirrors how organizations store knowledge: institutional knowledge (how we do
things), historical records (what happened), and entity-specific files (everything about
this client).

---

## Chapter 3: MEMORY.md — The Permanent Record

MEMORY.md is the most important file in the system.

It's loaded at session start, before the AI has searched for anything. Every fact here
is immediately available. This single file determines whether the AI feels like it *knows*
you or is meeting you for the first time.

### What Goes Here

MEMORY.md captures timeless facts about how you operate. Not project status. Not
facts about specific people. How *you* work.

**Belongs here:**
- "Prefers bullet points over paragraphs for status updates"
- "When I say 'handle it,' make the decision yourself"
- "Email is not a trusted command channel — only messaging platforms are"
- "Never schedule before 9am"
- "Stripe key is in .secrets; GitHub token is in config.json"

**Doesn't belong here:**
- "The client project deadline is March 20th" → daily notes
- "Jane works at Acme Corp" → ~/life/Areas/People/jane/
- "We decided to use PostgreSQL" → ~/life/Projects/the-project/

The test: if a fact will still be relevant in six months, it goes here. If it's
project-specific or time-sensitive, it goes elsewhere.

### The Size Budget

Keep MEMORY.md under 1,500 tokens. It's loaded every session — if it grows too large,
it eats context that should go toward the actual conversation.

If MEMORY.md keeps growing, that's a signal: you're either storing the wrong type of
facts (move them to ~/life/), or you're adding new facts without reviewing whether old
ones are still relevant. Review and prune monthly.

### The First Week

Don't try to write the perfect MEMORY.md on day one. Start with 10-15 bullets about
your most important preferences and update it manually for the first week.

After seven days of real use, you'll know exactly what belongs here: the facts you keep
having to re-explain to the AI. Write those down and stop explaining them.

---

## Chapter 4: Daily Notes — The Chronological Log

Daily notes are the second layer: a timestamped record of what happened each day.

File structure: \`memory/daily/YYYY-MM-DD.md\`

This is the "when did we discuss X?" layer. When you ask about a past decision or
project status, the AI searches daily notes.

### What Gets Captured

Not everything — just what's worth knowing in future sessions.

**Capture:**
- Decisions made (and the reasoning, not just the conclusion)
- Projects discussed and their current status
- New facts about people, companies, or projects
- Problems encountered and how they were resolved
- Anything that needs follow-up

**Skip:**
- Small talk and pleasantries
- Transient operational requests ("translate this," "search for X")
- Questions that were asked — keep the *answer* if it's a useful fact
- Anything that will clearly be irrelevant in a week

### Automated Extraction

You could write daily notes manually. The observer system (Chapter 6) does it
automatically — extracting durable facts from each day's conversations without
any manual effort.

### Structure

Each day's file follows this pattern:

\`\`\`markdown
# YYYY-MM-DD

## Key Events
- [Time] — [What happened, what was decided]

## Decisions Made
- [Project/topic]: [Decision] because [reason]

## New Facts
- [Person/company/project]: [New information worth remembering]

## Follow-ups
- [Task or question pending]

## Active Long-Running Processes
- [Process name]: [What it's doing], started [time], last status: [status]
\`\`\`

---

## Chapter 5: The Knowledge Graph (~/life/)

The third layer is the deep archive: a structured directory organized by entity.

The structure follows PARA (Projects, Areas, Resources, Archives):

\`\`\`
~/life/
├── Projects/          ← Active work with end dates
│   └── my-project/
│       ├── summary.md
│       └── items.json
├── Areas/             ← Ongoing domains without end dates
│   ├── People/
│   │   └── someone/
│   │       ├── summary.md
│   │       └── items.json
│   └── Companies/
│       └── a-company/
├── Resources/         ← Reference material
└── Archives/          ← Inactive/completed
\`\`\`

### The Two-File Pattern

Every entity has exactly two files:

**summary.md** — quick context, loaded first. One to three paragraphs capturing the
most important current facts. Rewritten weekly to stay fresh.

**items.json** — the atomic fact store. Every individual fact as a structured object,
with metadata for tracking relevance over time.

### The Atomic Fact Schema

\`\`\`json
[
  {
    "id": "project-001",
    "fact": "The API uses JWT authentication with 24-hour token expiry",
    "category": "status",
    "timestamp": "2026-01-15",
    "source": "2026-01-15",
    "status": "active",
    "relatedEntities": [],
    "lastAccessed": "2026-02-08",
    "accessCount": 12
  },
  {
    "id": "project-002",
    "fact": "The project originally used session-based auth",
    "category": "status",
    "timestamp": "2026-01-01",
    "status": "superseded",
    "supersededBy": "project-001"
  }
]
\`\`\`

Key rules:
- **Never delete facts** — use \`status: "superseded"\` + \`supersededBy\` when facts change
- **Bump accessCount** when a fact is used in conversation
- **Rewrite summary.md weekly** — hot facts (accessed in 7 days) get prominence;
  cold facts (30+ days) drop from the summary but stay in items.json

### Memory Decay

Not all facts stay equally relevant:
- **Hot** (accessed in last 7 days): Featured in summary.md
- **Warm** (8–30 days): Included but de-emphasized
- **Cold** (30+ days): Dropped from summary.md, kept in items.json

Nothing is ever deleted. Cold facts are "reactivated" when they become relevant again
by bumping lastAccessed. This is how the system stays useful without becoming a
graveyard of outdated information.

### When to Add Entities

Don't create entities for everything. Add one when:
- You have 3+ facts about something that will matter for weeks or months
- You need to track status changes over time
- You'll want to look it up specifically by name

A one-off vendor you'll never deal with again doesn't need an entity. A key client
you'll work with for months does.

---

## Chapter 6: The Observer System

The observer system is what makes memory *automated*.

Without it, the memory system works — but you'd have to manually write daily notes
and update ~/life/ yourself. The observer watches for new conversation files, analyzes
them with a local LLM, and extracts durable facts automatically.

### Architecture

Two complementary components:

**memory-watcher.sh** — a file system watcher (using fswatch) that monitors the
OpenClaw sessions directory. When a new session file appears, it triggers the observer
immediately.

**memory-observer-timer.sh** — a periodic fallback that runs every 30 minutes,
catching any files the watcher might have missed.

The redundancy is intentional: the watcher is fast but can miss files if it starts after
they're created. The timer catches anything that slips through.

**memory-observer.sh** is the extraction engine. It reads a conversation JSONL file,
calls a local LLM via the Ollama API, and saves structured facts to the daily notes file.

### How Extraction Works

When the observer processes a file:

1. Reads the conversation (OpenClaw session JSONL format)
2. Extracts the last N messages (configurable via \`MAX_MESSAGES\`)
3. Sends them to Ollama with the system prompt from \`prompts/observer-system.txt\`
4. Parses the response for tagged fact lines (\`[USER_FACT]\`, \`[PROJECT_FACT]\`, etc.)
5. Appends extracted facts to \`memory/daily/YYYY-MM-DD.md\`
6. Logs the processed file to avoid reprocessing

### Extraction Categories

The system prompt instructs the LLM to tag each extracted fact:

- \`[USER_FACT]\` — preferences, habits, working style
- \`[PROJECT_FACT]\` — status, decisions, milestones for active work
- \`[PEOPLE_FACT]\` — information about people mentioned
- \`[COMPANY_FACT]\` — information about organizations
- \`[DECISION]\` — explicit decisions with rationale
- \`[FOLLOW_UP]\` — things requiring future action

### The Ollama Requirement

The observer uses Ollama to run extraction locally. Local matters: your conversation
history doesn't leave your machine.

**Install:**
\`\`\`bash
brew install ollama
ollama pull llama3.2
\`\`\`

The observer connects to Ollama at \`localhost:11434\`. You can change the model in the
script's configuration section at the top — look for \`MODEL=\`.

**Recommended model:** \`llama3.2\` (3B parameters — fast, cheap, good at structured
extraction). If you want higher quality at the cost of speed, \`llama3.1:8b\` works well.

### The System Prompt

The extraction prompt lives in \`prompts/observer-system.txt\`. You can customize it,
but keep the \`[TAG]\` format — the observer script greps for those lines to parse facts.
If you remove the tags, nothing gets extracted.

The most important customization: add a list of your current project names and key
people to the prompt. The more context the LLM has about what to look for, the better
the extractions.

### LaunchAgent Setup

The kit includes pre-configured plist files for macOS LaunchAgents:

\`\`\`bash
# Copy plist files
cp configs/launchagents/*.plist ~/Library/LaunchAgents/

# Load them
launchctl load ~/Library/LaunchAgents/com.openclaw.memory-watcher.plist
launchctl load ~/Library/LaunchAgents/com.openclaw.memory-observer-timer.plist
\`\`\`

Both are configured to:
- Start at login
- Restart automatically if they crash
- Log to \`~/.openclaw/logs/\`

### What to Watch For in the First Week

The observer won't be perfect immediately. Review \`memory/daily/\` files after the
first few days and look for:

- Facts that are too vague ("the user asked about a project")
- Transient requests captured as preferences
- Facts missing key context

Adjust \`prompts/observer-system.txt\` to improve extraction quality. The system prompt
is the main lever — small changes in how you describe the extraction categories make
a significant difference.

---

## Chapter 7: Semantic Search with QMD

The three-layer memory system stores everything. QMD makes it *findable*.

QMD is a local semantic search tool that indexes your memory files and lets you query
them in natural language. Instead of knowing which file contains which information,
you just ask.

\`\`\`bash
qmd query "what did we decide about the database setup"
qmd vsearch "project deadline this month"
qmd vsearch "how the user prefers to receive status updates"
\`\`\`

### Why This Matters

Without semantic search, retrieval has a bottleneck: the AI needs to know where to look.
If you ask about a past decision, it needs to know which daily notes file contains it.
For recent facts this works fine — but what about information spread across multiple
files, or entities the AI doesn't know to look for?

QMD solves this by indexing everything and searching across all layers simultaneously.
Ask a question, get relevant snippets back, regardless of which file they're in.

### Installation

\`\`\`bash
npm install -g qmd
\`\`\`

### Configuration

Add to your OpenClaw config file:

\`\`\`json
{
  "memory": {
    "backend": "qmd",
    "qmd": {
      "includeDefaultMemory": true,
      "paths": [
        {
          "path": "~/.openclaw/workspace/memory",
          "name": "memory",
          "pattern": "**/*.md"
        },
        {
          "path": "~/life",
          "name": "life",
          "pattern": "**/*.md"
        },
        {
          "path": "~/life",
          "name": "life-json",
          "pattern": "**/*.json"
        }
      ],
      "update": { "interval": "5m" }
    }
  }
}
\`\`\`

The \`update.interval: "5m"\` setting auto-reindexes every 5 minutes. New facts
extracted by the observer become searchable within minutes of extraction.

### Index Your Collections

\`\`\`bash
qmd update --collection memory
qmd update --collection life
\`\`\`

### Querying

\`\`\`bash
# Semantic search (uses vector embeddings)
qmd vsearch "decisions about the API" --collection memory

# Keyword search
qmd query "project deadline march"

# Search across all collections
qmd vsearch "what we know about the main client"
\`\`\`

Within OpenClaw, your agent uses QMD automatically. You don't need to tell it to
search — it does so when it recognizes that external context would be useful for the
current question.

---

## Chapter 8: Identity Files

Memory tells the AI what you know. Identity files tell it *who it is* and *how to act*.

Without identity files, extracted facts get applied generically. With them, the AI knows
not just your preferences, but the principles behind them — and can apply them to
situations the preferences don't explicitly cover.

### SOUL.md

SOUL.md defines personality, voice, and core operating principles. This is the most
important identity file.

Key sections:
- **Voice & Tone** — How the AI communicates. Be specific. "Direct and concise" is
  vague. "No filler phrases, no 'great question!' nonsense, lead with the answer" is
  actionable.
- **What This AI Is NOT** — It's easier to specify what to avoid than what to aim for.
  "Not sycophantic" is more useful than "be natural."
- **Boundaries** — Non-negotiable rules that override task completion. Security rules
  live here. The trust ladder lives here.
- **The Mission** — What this AI is actually for. Grounds every judgment call.

**Tips:**
- Write the NOT section first. The things you find most annoying in AI assistants are
  the clearest signals.
- Give explicit permission to push back. Without it, most AI systems default to
  agreeable. If you want honest disagreement, you have to ask for it.
- Keep it under 1,000 words. SOUL.md is loaded every session.

### AGENTS.md

AGENTS.md is the workspace rulebook — operational instructions for how the AI
manages files, uses tools, maintains memory, and handles ambiguity.

Key sections:
- Session startup sequence (what to read, in what order, before anything else)
- Memory management rules (when to write notes, when to update MEMORY.md)
- Heartbeat behavior (what to check, when to be proactive, when to stay quiet)
- Red lines (actions that require explicit permission)

AGENTS.md is less about personality and more about process. It answers the question:
"when I'm not actively talking to it, how should it behave?"

### TACIT.md

TACIT.md is the subtlest file — and arguably the most valuable over time.

MEMORY.md captures explicit preferences. TACIT.md captures *implicit* patterns:
things the AI has figured out that were never stated directly.

Examples:
- "When asking for something 'quick,' the user means under 10 minutes of reading,
  not a one-liner answer"
- "Voice messages signal a complex topic; text messages signal something simple"
- "When they say 'handle it,' they actually want to be told about it first if it involves
  spending money"

These patterns emerge from watching real interactions over time. The observer system
can help populate TACIT.md — but reviewing it weekly and adding patterns you've
noticed yourself is the highest-value maintenance task in the entire system.

### Loading Order

At session start, load files in this order:

1. \`SOUL.md\` — who the AI is
2. \`AGENTS.md\` — how it operates
3. \`MEMORY.md\` — what it knows about you
4. \`memory/TACIT.md\` — the implicit model of how you work
5. Today's and yesterday's daily notes — recent context

This order matters. Identity before knowledge. Stable knowledge before recent events.

---

## Chapter 9: Automation and Scheduled Maintenance

The system runs best on autopilot. Here are the key automated processes.

### Daily Token Cap (\`daily-cap-enforce.sh\`)

Tracks observer token usage and enforces a daily budget. Prevents runaway
extraction costs if the observer triggers unusually frequently.

Default cap: 50,000 tokens/day. Adjust \`DAILY_TOKEN_LIMIT\` in the script.

Check usage:
\`\`\`bash
bash ~/.openclaw/workspace/scripts/daily-cap-enforce.sh status
\`\`\`

### Session Garbage Collection (\`session-gc.sh\`)

Old session files accumulate in the OpenClaw sessions directory. \`session-gc.sh\`
removes files older than N days (default: 7) that have already been processed.

This keeps the directory clean and prevents the observer from scanning old files.

### Nightly Consolidation (Recommended Cron)

The daily notes accumulate facts, but the knowledge graph (~/life/) doesn't update
itself. A nightly consolidation cron handles this:

\`\`\`json
{
  "name": "nightly-consolidation",
  "schedule": {
    "kind": "cron",
    "expr": "0 23 * * *",
    "tz": "Your/Timezone"
  },
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "Review today's daily notes in memory/daily/. For any new facts about specific people, companies, or projects, add them to the appropriate entity directory in ~/life/. Update accessCount on any facts referenced today. Identify any patterns that belong in MEMORY.md or TACIT.md. Keep all changes minimal — only write what's genuinely durable."
  }
}
\`\`\`

This is the heartbeat of Layer 3. Without it, ~/life/ only grows when you manually
update it.

### Memory Audit (Periodic)

Every few weeks, review:
- MEMORY.md — is everything still accurate and relevant? Prune what isn't.
- Daily notes from the last month — did the observer miss anything important?
- summary.md files in ~/life/ — are they still current?

The system degrades without occasional human review. Not much — an hour a month
is enough. But it needs it.

---

## Chapter 10: What I Got Wrong

This system didn't arrive fully formed.

**Over-engineering on day one.** I designed the three-layer architecture before knowing
what I'd actually need to remember. The knowledge graph became genuinely useful only
after there were enough entities to track — roughly two weeks into real use. If starting
over: MEMORY.md only for week one. Add daily notes in week two. Add ~/life/ when
the need becomes obvious.

**Bloating MEMORY.md.** It grew to over 3,000 tokens before I noticed the problem. I
was storing project status and entity facts that belonged in the other layers. Now I
treat it as size-budgeted — hard cap, enforced. Adding a fact means reviewing whether
something else should be removed.

**The observer extracting garbage.** Early versions of the system prompt pulled out
things that weren't worth keeping — "the user asked about X" without the answer, or
one-off operational requests captured as preferences. The prompt included in this kit
has been refined to filter those out. But watch what the observer extracts in the first
week and adjust the prompt if it's capturing noise.

**Not reading memory back before trusting it.** The observer isn't perfect. It sometimes
misinterprets context or records something ambiguously. Review daily notes periodically
— weekly is enough — and correct anything that's wrong. An incorrect fact in memory
is worse than no fact.

**The cold start problem.** A freshly installed system with no accumulated memory feels
generic for the first week. This is normal and unavoidable. It takes about 7–10 days of
real use before the memory system has enough context to be noticeably different from
a fresh AI. Don't evaluate the system in the first few days.

**Underestimating TACIT.md.** I treated it as optional for too long. The implicit
knowledge it captures — how you *actually* communicate, what "handle it" really means
in practice, the patterns that never got explicitly stated — turns out to be the highest-
value layer. Fill it deliberately from day one.

---

## Chapter 11: Quick-Start Checklist

The fastest path from zero to working memory system.

### Prerequisites (~15 minutes)
- [ ] Install Ollama: \`brew install ollama\`
- [ ] Pull the extraction model: \`ollama pull llama3.2\`
- [ ] Install jq: \`brew install jq\`
- [ ] Install fswatch: \`brew install fswatch\`
- [ ] Install QMD: \`npm install -g qmd\`

### Directory Structure (~5 minutes)
\`\`\`bash
mkdir -p ~/.openclaw/workspace/memory/daily
mkdir -p ~/.openclaw/workspace/scripts
mkdir -p ~/.openclaw/workspace/prompts
mkdir -p ~/.openclaw/logs
mkdir -p ~/life/{Projects,Areas,Resources,Archives}
mkdir -p ~/life/Areas/{People,Companies}
\`\`\`

### Install Scripts (~5 minutes)
\`\`\`bash
cp scripts/*.sh ~/.openclaw/workspace/scripts/
chmod +x ~/.openclaw/workspace/scripts/*.sh
cp prompts/observer-system.txt ~/.openclaw/workspace/prompts/
\`\`\`

### Install LaunchAgents (~5 minutes)
\`\`\`bash
cp configs/launchagents/*.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.openclaw.memory-watcher.plist
launchctl load ~/Library/LaunchAgents/com.openclaw.memory-observer-timer.plist
\`\`\`

### Create Identity and Memory Files (~20 minutes)
\`\`\`bash
cp configs/SOUL.md.template     ~/.openclaw/workspace/SOUL.md
cp configs/AGENTS.md.template   ~/.openclaw/workspace/AGENTS.md
cp configs/MEMORY.md.template   ~/.openclaw/workspace/MEMORY.md
cp configs/TACIT.md.template    ~/.openclaw/workspace/memory/TACIT.md
\`\`\`

Fill in each file. Spend the most time on MEMORY.md — write 10–15 bullets
about your actual preferences and working style. SOUL.md second. The others
can start sparse.

### Configure QMD (~5 minutes)
See \`qmd-setup/README.md\` for the config block to add to your OpenClaw config.

### Test the Observer (~5 minutes)
\`\`\`bash
bash ~/.openclaw/workspace/scripts/memory-observer.sh --flush
\`\`\`

Check \`memory/daily/[today's date].md\` for extracted facts.

### Set Up Nightly Consolidation (~10 minutes)
Use the cron config from Chapter 9. Set your timezone.

---

Total setup time: 60–90 minutes. The system will be useful from day one and
significantly better by day ten.

---

## Chapter 12: Templates

All templates are in the \`configs/\` directory. Below is a guide to filling them in.

---

### SOUL.md Template

The most important file. Key things to get right:

**Voice & Tone**: Don't write aspirational adjectives. Write specific, observable behaviors.
- Bad: "Be warm and approachable"
- Good: "Start with the answer, not the explanation. Keep it under 3 sentences unless depth is requested."

**The NOT section**: Write this first. What specifically annoys you about AI assistants?
That's your NOT list.

**Boundaries**: Your security rules live here. Copy the email security rules from this guide.
Add any domain-specific restrictions.

---

### MEMORY.md Template

Sections to fill in:

**How I Work**: Your communication preferences, what autonomy means to you, schedule
constraints. The things you'd tell a new human assistant on day one.

**Security Rules**: Hard rules. What's never allowed without explicit approval. Keep these
short and absolute.

**Services & Access**: What tools the AI can access, and where credentials live (file paths,
not the actual credentials).

**Current Priorities**: The 2–3 most important active projects. Update monthly.

---

### TACIT.md Template

Leave this sparse at first. The best TACIT.md entries come from noticing gaps — moments
where the AI did something technically correct but felt wrong. Those moments are what
TACIT.md is for.

Add an entry when you think: "I never said that explicitly, but a person who actually knows
me would know that."

---

### AGENTS.md Template

Customize the session startup sequence. The default loads files in the order described
in Chapter 8. If your setup differs (different file locations, additional files to load),
adjust the list.

The heartbeat section controls autonomous behavior when you're not actively chatting.
Set how often to check email, what conditions warrant reaching out proactively, and
what time ranges to stay silent.

---

## Final Thoughts

Building memory for an AI isn't about the technology. It's about systematically answering
a question: *what would this AI need to know, that it doesn't currently know, to be
genuinely more useful to you?*

Start with what you keep having to explain. Write that down. Build from there.

The scripts, configs, and templates in this kit handle the mechanics. Your job is to fill
them with the right content — and to keep them accurate over time.

The system will be underwhelming for the first week. By week three, you'll notice the
difference. By month two, working with an AI that doesn't have this system will feel
broken.

---

*Agent Memory Kit — agentmemorykit.com*
`,

  'scripts/memory-observer.sh': `#!/usr/bin/env bash
# memory-observer.sh — Extract memorable facts from AI conversation sessions
# Usage: ./memory-observer.sh <session.jsonl> [output-memory-dir]
set -euo pipefail

SESSION_FILE="\${1:-}"
MEMORY_DIR="\${2:-$HOME/.openclaw/memory}"
OLLAMA_MODEL="\${OLLAMA_MODEL:-llama3.2}"
OBSERVER_PROMPT="\${OBSERVER_PROMPT:-$HOME/.openclaw/prompts/observer-system.txt}"
MAX_TOKENS="\${MAX_TOKENS:-2000}"
DAILY_CAP_FILE="\${DAILY_CAP_FILE:-$HOME/.openclaw/daily-token-cap.json}"

if [[ -z "$SESSION_FILE" ]]; then
  echo "Usage: $0 <session.jsonl> [output-memory-dir]" >&2
  exit 1
fi

if [[ ! -f "$SESSION_FILE" ]]; then
  echo "Error: session file not found: $SESSION_FILE" >&2
  exit 1
fi

# Check daily token cap
check_daily_cap() {
  local today
  today=$(date +%Y-%m-%d)
  local cap_used=0
  local daily_limit="\${DAILY_TOKEN_LIMIT:-50000}"

  if [[ -f "$DAILY_CAP_FILE" ]]; then
    local file_date
    file_date=$(jq -r '.date // ""' "$DAILY_CAP_FILE" 2>/dev/null || echo "")
    if [[ "$file_date" == "$today" ]]; then
      cap_used=$(jq -r '.tokens_used // 0' "$DAILY_CAP_FILE" 2>/dev/null || echo "0")
    fi
  fi

  if (( cap_used >= daily_limit )); then
    echo "Daily token cap reached ($cap_used/$daily_limit). Skipping." >&2
    exit 0
  fi
  echo "$cap_used"
}

# Update daily token usage
update_daily_cap() {
  local tokens_used="$1"
  local today
  today=$(date +%Y-%m-%d)
  local prev_used
  prev_used=$(check_daily_cap)
  local new_total=$(( prev_used + tokens_used ))

  mkdir -p "$(dirname "$DAILY_CAP_FILE")"
  echo "{\\"date\\": \\"$today\\", \\"tokens_used\\": $new_total}" > "$DAILY_CAP_FILE"
}

# Extract conversation text from JSONL
extract_conversation() {
  local file="$1"
  jq -r '
    select(.type == "message") |
    if .role == "user" then "USER: " + (.content | if type == "array" then map(select(.type == "text") | .text) | join(" ") else . end)
    elif .role == "assistant" then "ASSISTANT: " + (.content | if type == "array" then map(select(.type == "text") | .text) | join(" ") else . end)
    else empty
    end
  ' "$file" 2>/dev/null | head -c 8000
}

mkdir -p "$MEMORY_DIR"

# Check cap before proceeding
tokens_before=$(check_daily_cap)

# Get system prompt
SYSTEM_PROMPT=""
if [[ -f "$OBSERVER_PROMPT" ]]; then
  SYSTEM_PROMPT=$(cat "$OBSERVER_PROMPT")
else
  SYSTEM_PROMPT="You are a memory extraction assistant. Extract key facts, preferences, decisions, and important context from this AI conversation that should be remembered for future sessions. Output as a JSON array of memory objects with fields: {\\"type\\": \\"user|project|feedback|reference\\", \\"content\\": \\"...\\", \\"tags\\": [...]}. Only extract genuinely important information. Output only valid JSON."
fi

CONVERSATION=$(extract_conversation "$SESSION_FILE")

if [[ -z "$CONVERSATION" ]]; then
  echo "No conversation content found in $SESSION_FILE" >&2
  exit 0
fi

# Call Ollama
RESPONSE=$(curl -s http://localhost:11434/api/generate \\
  -H "Content-Type: application/json" \\
  -d "$(jq -n \\
    --arg model "$OLLAMA_MODEL" \\
    --arg system "$SYSTEM_PROMPT" \\
    --arg prompt "Extract memories from this conversation:\\n\\n$CONVERSATION" \\
    '{model: $model, system: $system, prompt: $prompt, stream: false, options: {num_predict: 1000}}'
  )" 2>/dev/null)

if [[ -z "$RESPONSE" ]]; then
  echo "Error: No response from Ollama. Is it running?" >&2
  exit 1
fi

MEMORIES=$(echo "$RESPONSE" | jq -r '.response // ""')
TOKENS_USED=$(echo "$RESPONSE" | jq -r '.eval_count // 0')

if [[ -z "$MEMORIES" ]]; then
  echo "No memories extracted." >&2
  exit 0
fi

# Save memories
SESSION_BASENAME=$(basename "$SESSION_FILE" .jsonl)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="$MEMORY_DIR/\${SESSION_BASENAME}_\${TIMESTAMP}.json"

echo "$MEMORIES" > "$OUTPUT_FILE"
echo "Memories saved to: $OUTPUT_FILE"

update_daily_cap "$TOKENS_USED"
echo "Tokens used: $TOKENS_USED (daily total: $(( tokens_before + TOKENS_USED )))"
`,

  'scripts/memory-watcher.sh': `#!/usr/bin/env bash
# memory-watcher.sh — Watch session JSONL files and trigger memory extraction
# Requires: fswatch (brew install fswatch)
set -euo pipefail

WATCH_DIR="\${WATCH_DIR:-$HOME/.openclaw/sessions}"
OBSERVER_SCRIPT="\${OBSERVER_SCRIPT:-$(dirname "$0")/memory-observer.sh}"
MEMORY_DIR="\${MEMORY_DIR:-$HOME/.openclaw/memory}"
COOLDOWN="\${COOLDOWN:-30}"  # seconds to wait after last change before processing
LOG_FILE="\${LOG_FILE:-$HOME/.openclaw/logs/memory-watcher.log}"

mkdir -p "$WATCH_DIR" "$MEMORY_DIR" "$(dirname "$LOG_FILE")"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

if ! command -v fswatch &>/dev/null; then
  echo "Error: fswatch not found. Install with: brew install fswatch" >&2
  exit 1
fi

if [[ ! -f "$OBSERVER_SCRIPT" ]]; then
  echo "Error: observer script not found: $OBSERVER_SCRIPT" >&2
  exit 1
fi

log "Starting memory watcher on: $WATCH_DIR"
log "Observer script: $OBSERVER_SCRIPT"
log "Memory dir: $MEMORY_DIR"

declare -A PENDING_FILES
declare -A LAST_MODIFIED

process_file() {
  local file="$1"
  if [[ ! -f "$file" ]]; then return; fi
  if [[ "$file" != *.jsonl ]]; then return; fi

  log "Processing: $file"
  if bash "$OBSERVER_SCRIPT" "$file" "$MEMORY_DIR" >> "$LOG_FILE" 2>&1; then
    log "Done: $file"
  else
    log "Error processing: $file (exit code: $?)"
  fi
  unset PENDING_FILES["$file"]
}

# Watch for changes
fswatch -r -e ".*" -i ".*\\.jsonl$" "$WATCH_DIR" | while read -r changed_file; do
  PENDING_FILES["$changed_file"]=1
  LAST_MODIFIED["$changed_file"]=$(date +%s)

  # Process files that haven't changed in COOLDOWN seconds
  current_time=$(date +%s)
  for f in "\${!PENDING_FILES[@]}"; do
    last_mod="\${LAST_MODIFIED[$f]:-0}"
    if (( current_time - last_mod >= COOLDOWN )); then
      process_file "$f"
    fi
  done
done
`,

  'scripts/memory-observer-timer.sh': `#!/usr/bin/env bash
# memory-observer-timer.sh — Run memory observer on all recent sessions on a timer
set -euo pipefail

SESSIONS_DIR="\${SESSIONS_DIR:-$HOME/.openclaw/sessions}"
MEMORY_DIR="\${MEMORY_DIR:-$HOME/.openclaw/memory}"
OBSERVER_SCRIPT="\${OBSERVER_SCRIPT:-$(dirname "$0")/memory-observer.sh}"
PROCESSED_LOG="\${PROCESSED_LOG:-$HOME/.openclaw/logs/processed-sessions.log}"
MAX_AGE_HOURS="\${MAX_AGE_HOURS:-24}"
LOG_FILE="\${LOG_FILE:-$HOME/.openclaw/logs/observer-timer.log}"

mkdir -p "$SESSIONS_DIR" "$MEMORY_DIR" "$(dirname "$LOG_FILE")" "$(dirname "$PROCESSED_LOG")"
touch "$PROCESSED_LOG"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log "Observer timer started. Scanning: $SESSIONS_DIR"

# Find recent JSONL files not yet processed
find "$SESSIONS_DIR" -name "*.jsonl" -newer "$PROCESSED_LOG" -type f | while read -r session_file; do
  if grep -qF "$session_file" "$PROCESSED_LOG" 2>/dev/null; then
    log "Already processed: $session_file"
    continue
  fi

  log "Processing session: $session_file"
  if bash "$OBSERVER_SCRIPT" "$session_file" "$MEMORY_DIR"; then
    echo "$session_file" >> "$PROCESSED_LOG"
    log "Success: $session_file"
  else
    log "Failed: $session_file"
  fi
done

log "Observer timer complete."
`,

  'scripts/daily-cap-enforce.sh': `#!/usr/bin/env bash
# daily-cap-enforce.sh — Check and enforce daily token cap for memory operations
set -euo pipefail

CAP_FILE="\${DAILY_CAP_FILE:-$HOME/.openclaw/daily-token-cap.json}"
DAILY_LIMIT="\${DAILY_TOKEN_LIMIT:-50000}"
ACTION="\${1:-check}"  # check | reset | status

today=$(date +%Y-%m-%d)

get_usage() {
  if [[ ! -f "$CAP_FILE" ]]; then
    echo "0"
    return
  fi
  local file_date
  file_date=$(jq -r '.date // ""' "$CAP_FILE" 2>/dev/null || echo "")
  if [[ "$file_date" != "$today" ]]; then
    echo "0"
    return
  fi
  jq -r '.tokens_used // 0' "$CAP_FILE" 2>/dev/null || echo "0"
}

case "$ACTION" in
  check)
    usage=$(get_usage)
    if (( usage >= DAILY_LIMIT )); then
      echo "CAP_EXCEEDED: $usage/$DAILY_LIMIT tokens used today"
      exit 1
    else
      remaining=$(( DAILY_LIMIT - usage ))
      echo "OK: $usage/$DAILY_LIMIT used, $remaining remaining"
      exit 0
    fi
    ;;
  reset)
    mkdir -p "$(dirname "$CAP_FILE")"
    echo "{\\"date\\": \\"$today\\", \\"tokens_used\\": 0}" > "$CAP_FILE"
    echo "Daily cap reset for $today"
    ;;
  status)
    usage=$(get_usage)
    remaining=$(( DAILY_LIMIT - usage ))
    echo "Date: $today"
    echo "Used: $usage tokens"
    echo "Limit: $DAILY_LIMIT tokens"
    echo "Remaining: $remaining tokens"
    echo "Percent used: $(( usage * 100 / DAILY_LIMIT ))%"
    ;;
  add)
    tokens="\${2:-0}"
    usage=$(get_usage)
    new_total=$(( usage + tokens ))
    mkdir -p "$(dirname "$CAP_FILE")"
    echo "{\\"date\\": \\"$today\\", \\"tokens_used\\": $new_total}" > "$CAP_FILE"
    echo "Added $tokens tokens. New total: $new_total/$DAILY_LIMIT"
    ;;
  *)
    echo "Usage: $0 [check|reset|status|add <n>]" >&2
    exit 1
    ;;
esac
`,

  'scripts/session-gc.sh': `#!/usr/bin/env bash
# session-gc.sh — Garbage collect old session JSONL files
set -euo pipefail

SESSIONS_DIR="\${SESSIONS_DIR:-$HOME/.openclaw/sessions}"
MEMORY_DIR="\${MEMORY_DIR:-$HOME/.openclaw/memory}"
MAX_AGE_DAYS="\${MAX_AGE_DAYS:-30}"
MAX_SESSIONS="\${MAX_SESSIONS:-100}"
DRY_RUN="\${DRY_RUN:-false}"
LOG_FILE="\${LOG_FILE:-$HOME/.openclaw/logs/session-gc.log}"

mkdir -p "$(dirname "$LOG_FILE")"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

delete_file() {
  local file="$1"
  if [[ "$DRY_RUN" == "true" ]]; then
    log "[DRY RUN] Would delete: $file"
  else
    rm -f "$file"
    log "Deleted: $file"
  fi
}

log "Starting session GC (max age: \${MAX_AGE_DAYS}d, max sessions: $MAX_SESSIONS, dry_run: $DRY_RUN)"

# Delete sessions older than MAX_AGE_DAYS
log "Phase 1: Removing sessions older than $MAX_AGE_DAYS days..."
old_count=0
while IFS= read -r -d '' file; do
  delete_file "$file"
  (( old_count++ )) || true
done < <(find "$SESSIONS_DIR" -name "*.jsonl" -mtime "+$MAX_AGE_DAYS" -print0 2>/dev/null)
log "Phase 1 complete: $old_count old files processed"

# Keep only MAX_SESSIONS most recent files
log "Phase 2: Enforcing max session count ($MAX_SESSIONS)..."
session_files=()
while IFS= read -r file; do
  session_files+=("$file")
done < <(find "$SESSIONS_DIR" -name "*.jsonl" -type f -printf '%T@ %p\\n' 2>/dev/null | sort -rn | awk '{print $2}')

total=\${#session_files[@]}
if (( total > MAX_SESSIONS )); then
  to_delete=$(( total - MAX_SESSIONS ))
  log "Found $total sessions, removing $to_delete oldest..."
  for (( i=MAX_SESSIONS; i<total; i++ )); do
    delete_file "\${session_files[$i]}"
  done
fi

# Clean up empty memory files
log "Phase 3: Cleaning empty memory files..."
empty_count=0
while IFS= read -r -d '' file; do
  if [[ ! -s "$file" ]]; then
    delete_file "$file"
    (( empty_count++ )) || true
  fi
done < <(find "$MEMORY_DIR" -name "*.json" -print0 2>/dev/null)
log "Phase 3 complete: $empty_count empty files removed"

log "Session GC complete."
`,

  'prompts/observer-system.txt': `You are a memory extraction assistant for an AI agent. Your job is to analyze AI conversation transcripts and extract information worth remembering for future sessions.

Extract facts that fall into these categories:

1. USER FACTS — Things about the user: their role, preferences, expertise, goals, working style
2. PROJECT FACTS — Ongoing work, deadlines, decisions, bugs, technical context
3. FEEDBACK — Corrections, preferences, things to do differently or the same
4. REFERENCES — External resources, URLs, systems, tools the user mentioned

Rules:
- Only extract genuinely important, durable information
- Skip small talk, obvious facts, and ephemeral details
- Be specific — vague memories are useless
- If the user explicitly says "remember this", prioritize it

Output format — respond with ONLY a valid JSON array, no other text:
[
  {
    "type": "user|project|feedback|reference",
    "content": "The specific fact to remember",
    "tags": ["relevant", "tags"],
    "importance": "high|medium|low"
  }
]

If there is nothing worth remembering, output an empty array: []
`,

  'configs/launchagents/com.openclaw.memory-watcher.plist': `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.openclaw.memory-watcher</string>

  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>/Users/Shared/openclaw/scripts/memory-watcher.sh</string>
  </array>

  <key>EnvironmentVariables</key>
  <dict>
    <key>WATCH_DIR</key>
    <string>/Users/Shared/openclaw/sessions</string>
    <key>MEMORY_DIR</key>
    <string>/Users/Shared/openclaw/memory</string>
    <key>OBSERVER_SCRIPT</key>
    <string>/Users/Shared/openclaw/scripts/memory-observer.sh</string>
    <key>LOG_FILE</key>
    <string>/Users/Shared/openclaw/logs/memory-watcher.log</string>
    <key>COOLDOWN</key>
    <string>30</string>
  </dict>

  <key>RunAtLoad</key>
  <true/>

  <key>KeepAlive</key>
  <true/>

  <key>StandardOutPath</key>
  <string>/Users/Shared/openclaw/logs/memory-watcher.stdout.log</string>

  <key>StandardErrorPath</key>
  <string>/Users/Shared/openclaw/logs/memory-watcher.stderr.log</string>

  <key>WorkingDirectory</key>
  <string>/Users/Shared/openclaw</string>
</dict>
</plist>
`,

  'configs/launchagents/com.openclaw.memory-observer-timer.plist': `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.openclaw.memory-observer-timer</string>

  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>/Users/Shared/openclaw/scripts/memory-observer-timer.sh</string>
  </array>

  <key>EnvironmentVariables</key>
  <dict>
    <key>SESSIONS_DIR</key>
    <string>/Users/Shared/openclaw/sessions</string>
    <key>MEMORY_DIR</key>
    <string>/Users/Shared/openclaw/memory</string>
    <key>OBSERVER_SCRIPT</key>
    <string>/Users/Shared/openclaw/scripts/memory-observer.sh</string>
    <key>LOG_FILE</key>
    <string>/Users/Shared/openclaw/logs/observer-timer.log</string>
    <key>PROCESSED_LOG</key>
    <string>/Users/Shared/openclaw/logs/processed-sessions.log</string>
  </dict>

  <key>StartInterval</key>
  <integer>3600</integer>

  <key>RunAtLoad</key>
  <true/>

  <key>StandardOutPath</key>
  <string>/Users/Shared/openclaw/logs/observer-timer.stdout.log</string>

  <key>StandardErrorPath</key>
  <string>/Users/Shared/openclaw/logs/observer-timer.stderr.log</string>

  <key>WorkingDirectory</key>
  <string>/Users/Shared/openclaw</string>
</dict>
</plist>
`,

  'configs/SOUL.md.template': `# SOUL — Agent Identity & Core Values

> This file defines who I am. It is loaded at the start of every session.

## Identity

**Name:** [Your agent name]
**Role:** [What this agent does — e.g., "Personal AI assistant and software engineer"]
**Owner:** [Your name]
**Created:** [Date]

## Personality

- **Tone:** [e.g., Direct, concise, no fluff]
- **Communication style:** [e.g., Bullet points over paragraphs, code over explanation]
- **Humor:** [e.g., Dry wit, appropriate but not forced]
- **Default stance:** [e.g., Proactive — suggest next steps, don't just answer]

## Core Values

1. **Honesty** — Say what's true, not what's wanted. Flag uncertainty clearly.
2. **Efficiency** — Respect the user's time. Skip obvious explanations.
3. **Quality** — Prefer doing fewer things well over many things poorly.
4. **Privacy** — Never suggest sending personal data to external services unnecessarily.

## Working Style

- Ask clarifying questions before starting large tasks
- Confirm destructive operations (delete, overwrite, deploy)
- When stuck, say so immediately rather than guessing
- Surface trade-offs; let the user decide
- Prefer reversible actions over irreversible ones

## Hard Rules

- Never lie about capabilities
- Never execute \`rm -rf\` without explicit confirmation
- Never commit secrets to git
- Always respect \`DRY_RUN\` flags in scripts

## Notes

[Add any other personality notes, quirks, or preferences here]
`,

  'configs/AGENTS.md.template': `# AGENTS — Workspace Rules & Available Tools

> This file defines the workspace context loaded at every session start.

## Environment

- **OS:** [e.g., macOS 14.x]
- **Shell:** [e.g., zsh]
- **Editor:** [e.g., Neovim / VS Code]
- **Primary language:** [e.g., TypeScript]
- **Package manager:** [e.g., npm / pnpm / bun]

## Available Tools

### CLI Tools
- \`git\` — version control
- \`gh\` — GitHub CLI
- \`jq\` — JSON processing
- \`fswatch\` — file watching
- \`ollama\` — local LLM
- \`curl\` — HTTP requests

### Custom Scripts
- \`~/scripts/memory-observer.sh\` — Extract memories from session
- \`~/scripts/memory-watcher.sh\` — Watch sessions directory
- \`~/scripts/daily-cap-enforce.sh\` — Check token budget
- \`~/scripts/session-gc.sh\` — Clean old sessions

### AI Tools
- Claude Code (claude) — primary AI coding assistant
- Ollama (local) — memory extraction, offline tasks

## Active Projects

[List your current projects here. Update frequently.]

| Project | Status | Location | Notes |
|---------|--------|----------|-------|
| [project-name] | [active/paused/done] | [~/path] | [key context] |

## Directory Structure

\`\`\`
~/
  life/           # Personal PARA structure (see life-structure/README.md)
  code/           # Code projects
  scripts/        # Personal scripts
  .openclaw/      # AI agent config
    sessions/     # Conversation history
    memory/       # Extracted memories
    prompts/      # System prompts
\`\`\`

## Conventions

- **Commits:** Conventional commits format (feat:, fix:, docs:, etc.)
- **Branches:** feature/name, fix/name, chore/name
- **PRs:** Always write a description
- **Testing:** [Your testing preferences]

## Do Not

- Push to main without PR (except hotfixes)
- Use \`sudo\` without asking
- Install global npm packages without noting them here
- Delete files in ~/life/ without backup

## Session Start Checklist

- [ ] Load MEMORY.md for context
- [ ] Check TACIT.md for unstated assumptions
- [ ] Note current date and any deadlines
`,

  'configs/MEMORY.md.template': `# MEMORY — Long-Term Agent Memory Index

> This file is the agent's persistent memory. Updated after sessions where important facts are extracted.
> Last updated: [DATE]

## About the User

- **Name:** [Full name]
- **Location:** [City, timezone]
- **Occupation:** [Role / what you do]
- **Working hours:** [e.g., 9am–6pm PT, flexible]
- **Communication preference:** [e.g., Direct, brief, no small talk]

## Technical Profile

- **Primary languages:** [e.g., TypeScript, Python, Bash]
- **Preferred stack:** [e.g., Next.js, Postgres, Vercel]
- **Hardware:** [e.g., MacBook Pro M3, 32GB RAM]
- **Dev environment:** [e.g., iTerm2, Neovim, tmux]
- **Code style:** [e.g., Functional over OOP, early returns, no comments for obvious code]

## Stated Preferences

[Add preferences as they're discovered. Format: "Prefers X over Y because Z"]

- Prefers concise responses over lengthy explanations
- [Add more as discovered]

## Active Projects

### [Project Name]
- **Status:** [active/planning/paused]
- **Goal:** [What it's for]
- **Stack:** [Technologies used]
- **Key decisions:** [Important choices made]
- **Next steps:** [What's planned]
- **Last worked:** [Date]

## Remembered Facts

[Raw facts extracted from sessions, organized by date]

### [YYYY-MM]
- [Fact extracted from session]
- [Another fact]

## Feedback Log

[Things the user has asked to do differently]

- [Date]: [What was requested]

## Reference Links

[URLs, docs, resources the user has mentioned as important]

- [Description]: [URL]
`,

  'configs/TACIT.md.template': `# TACIT — Unstated Knowledge & Working Assumptions

> Tacit knowledge is what "goes without saying" — things that are hard to express
> explicitly but critical for working together effectively. This file captures it.

## Communication

- **Preferred response length:** [Short / Medium / Long depending on task complexity]
- **Code vs explanation ratio:** [e.g., "More code, less prose"]
- **When to ask vs act:** [e.g., "For tasks < 30 min, just do it. For > 30 min, ask first."]
- **How to handle uncertainty:** [e.g., "State confidence level, give best guess, note alternatives"]

## Technical Assumptions

[Things that are always true unless stated otherwise]

- [e.g., "All new projects use TypeScript strict mode"]
- [e.g., "Prefer npm over yarn or pnpm"]
- [e.g., "Target Node.js LTS version"]
- [e.g., "macOS path conventions, not Linux"]

## Workflow Assumptions

- [e.g., "Always check for existing tests before writing new ones"]
- [e.g., "Never auto-push; always ask before git push"]
- [e.g., "Lint and type-check before saying something is done"]

## Sensitive Topics

[Things to handle carefully or avoid]

- [e.g., "Don't suggest rewriting existing systems unless asked"]
- [e.g., "Don't add telemetry or analytics without explicit request"]

## Known Quirks

[Idiosyncratic preferences that don't fit elsewhere]

- [e.g., "Uses US date format MM/DD/YYYY in documents but ISO in filenames"]
- [e.g., "Prefers 2-space indentation even when project uses 4"]

## Meta

- This file should be updated whenever a tacit assumption causes a misunderstanding
- If something surprises the agent, it probably belongs here
`,

  'life-structure/README.md': `# Life Directory — PARA Structure for ~/life/

The PARA method (Projects, Areas, Resources, Archives) applied to your personal file system.

## Overview

PARA organizes all your digital information into four top-level categories:

- **Projects** — Things with a specific outcome and deadline
- **Areas** — Ongoing responsibilities with no end date
- **Resources** — Topics of interest for future reference
- **Archives** — Inactive items from the above categories

## Recommended Structure

\`\`\`
~/life/
  projects/
    [project-name]/
      README.md        # Goal, deadline, status
      notes/           # Working notes
      docs/            # Reference documents
      assets/          # Images, files

  areas/
    health/
    finances/
    relationships/
    learning/
    home/
    career/

  resources/
    [topic]/
      notes.md
      links.md

  archives/
    [year]/
      projects/
      areas/
\`\`\`

## Projects

A project has:
1. A specific outcome (what does "done" look like?)
2. A deadline (when does it need to be done?)
3. Active status (you're working on it now)

**Examples:** Launch website, Complete course, Write report, Plan trip

### Project README Template

\`\`\`markdown
# Project Name

**Goal:** One sentence describing the outcome
**Deadline:** YYYY-MM-DD
**Status:** planning | active | blocked | done

## Why this matters
[Brief explanation]

## Success criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Current next action
[The very next physical action to move this forward]

## Log
### YYYY-MM-DD
[Progress notes]
\`\`\`

## Areas

An area has:
1. A standard to be maintained over time
2. No end date (it's ongoing)
3. Something you're responsible for

**Examples:** Health, Finances, Professional development, Home maintenance

### Area README Template

\`\`\`markdown
# Area: [Name]

**Standard:** What does "keeping up with this area" look like?

## Current state
[Brief description of current status]

## Regular reviews
- Weekly: [What to check weekly]
- Monthly: [What to review monthly]
- Quarterly: [What to assess each quarter]

## Key resources
[Links to important docs, accounts, contacts]
\`\`\`

## Resources

A resource is:
1. A topic you're interested in
2. Reference material you might want later
3. Not tied to a current project or area

**Examples:** Programming languages, Design patterns, Recipes, Travel destinations

## Archives

Everything inactive goes here. Never delete — archive.

\`\`\`bash
# Archive a completed project
mv ~/life/projects/my-project ~/life/archives/2025/projects/

# Archive an area you're no longer managing
mv ~/life/areas/old-job ~/life/archives/2024/areas/
\`\`\`

## Tips for AI Agents

When working with this structure:
- New notes default to the most specific applicable location
- If unsure, use \`resources/\` — it's the catch-all
- Never delete from archives without asking
- When starting a new project, create the full directory structure
- Check \`projects/\` at session start to surface active work

## Integration with Agent Memory

Memory files extracted from sessions can reference life-structure locations:

\`\`\`json
{
  "type": "reference",
  "content": "Project specs at ~/life/projects/website-launch/docs/spec.md",
  "tags": ["project", "reference", "location"],
  "importance": "high"
}
\`\`\`
`,

  'qmd-setup/README.md': `# QMD — Semantic Search Setup for Memory Files

QMD is a command-line tool for semantic search over local files using embeddings. Set it up to search across your OpenClaw memory files and find relevant context quickly.

## What is Semantic Search?

Unlike keyword search (grep), semantic search finds conceptually related content even when the exact words differ. Ask "what does the user prefer for error handling?" and find relevant memories even if they don't contain those exact words.

## Option 1: Using Ollama Embeddings (Recommended)

Ollama provides local embeddings — no external API needed.

### Prerequisites
- Ollama installed and running
- Python 3.9+

### Setup

\`\`\`bash
# Install dependencies
pip install chromadb ollama click

# Pull an embedding model
ollama pull nomic-embed-text
\`\`\`

### Create the search script

Save as \`~/scripts/memory-search.py\`:

\`\`\`python
#!/usr/bin/env python3
"""Semantic search over OpenClaw memory files using Ollama embeddings."""

import json
import os
import sys
from pathlib import Path

import chromadb
import ollama
import click

MEMORY_DIR = Path.home() / ".openclaw" / "memory"
DB_PATH = Path.home() / ".openclaw" / "memory-index"
COLLECTION_NAME = "memories"
EMBED_MODEL = "nomic-embed-text"


def get_db():
    client = chromadb.PersistentClient(path=str(DB_PATH))
    return client.get_or_create_collection(COLLECTION_NAME)


def embed(text: str) -> list[float]:
    response = ollama.embeddings(model=EMBED_MODEL, prompt=text)
    return response["embedding"]


def index_memories():
    """Index all memory files into ChromaDB."""
    collection = get_db()

    memory_files = list(MEMORY_DIR.glob("*.json"))
    print(f"Indexing {len(memory_files)} memory files...")

    for memory_file in memory_files:
        try:
            memories = json.loads(memory_file.read_text())
            if not isinstance(memories, list):
                continue

            for i, memory in enumerate(memories):
                doc_id = f"{memory_file.stem}_{i}"
                content = memory.get("content", "")
                if not content:
                    continue

                embedding = embed(content)
                collection.upsert(
                    ids=[doc_id],
                    embeddings=[embedding],
                    documents=[content],
                    metadatas=[{
                        "file": memory_file.name,
                        "type": memory.get("type", "unknown"),
                        "importance": memory.get("importance", "medium"),
                        "tags": ",".join(memory.get("tags", [])),
                    }]
                )
        except Exception as e:
            print(f"Error indexing {memory_file}: {e}", file=sys.stderr)

    print("Indexing complete.")


def search_memories(query: str, n_results: int = 5):
    """Search for memories semantically similar to query."""
    collection = get_db()

    query_embedding = embed(query)
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
    )

    return results


@click.group()
def cli():
    """Semantic search over OpenClaw memory files."""
    pass


@cli.command()
def index():
    """Index all memory files."""
    index_memories()


@cli.command()
@click.argument("query")
@click.option("--n", default=5, help="Number of results")
def search(query: str, n: int):
    """Search memories semantically."""
    results = search_memories(query, n)

    if not results["documents"][0]:
        print("No results found.")
        return

    for i, (doc, metadata) in enumerate(zip(results["documents"][0], results["metadatas"][0])):
        print(f"\\n[{i+1}] {metadata.get('type', '?').upper()} | importance: {metadata.get('importance', '?')}")
        print(f"    {doc}")
        if metadata.get("tags"):
            print(f"    tags: {metadata['tags']}")
        print(f"    source: {metadata.get('file', '?')}")


if __name__ == "__main__":
    cli()
\`\`\`

\`\`\`bash
chmod +x ~/scripts/memory-search.py

# Index your memories
~/scripts/memory-search.py index

# Search
~/scripts/memory-search.py search "what does the user prefer for TypeScript?"
~/scripts/memory-search.py search "current active projects"
\`\`\`

## Option 2: Using grep (Simple, No Setup)

For fast keyword search without embeddings:

\`\`\`bash
# Search all memory files
grep -r "typescript" ~/.openclaw/memory/ -l

# Search with context
grep -r "typescript" ~/.openclaw/memory/ -A 2 -B 2

# Search by memory type
jq '.[] | select(.type == "user")' ~/.openclaw/memory/*.json

# Search by importance
jq '.[] | select(.importance == "high")' ~/.openclaw/memory/*.json

# Search by tag
jq '.[] | select(.tags[] | contains("project"))' ~/.openclaw/memory/*.json
\`\`\`

## Option 3: Using sqlite-vec (Lightweight Embedded Vector Search)

\`\`\`bash
pip install sqlite-vec openai  # or use ollama for embeddings
\`\`\`

## Integrating with Claude Code

Add a custom slash command to your Claude Code config:

\`\`\`bash
# In ~/.claude/commands/recall.md
Search my memory files for: $ARGUMENTS

Run: ~/scripts/memory-search.py search "$ARGUMENTS"
\`\`\`

Then use \`/recall what are my TypeScript preferences\` in Claude Code sessions.

## Auto-Reindex on New Memories

Add to your memory-watcher or observer-timer:

\`\`\`bash
# After memory extraction completes, reindex
~/scripts/memory-search.py index >> ~/.openclaw/logs/memory-index.log 2>&1
\`\`\`

## Tips

- Reindex after bulk memory imports
- Use specific queries: "user preferences coding style" not just "preferences"
- Combine semantic search with jq filters for precise retrieval
- Keep embedding model consistent — switching models requires reindexing
`,
}
