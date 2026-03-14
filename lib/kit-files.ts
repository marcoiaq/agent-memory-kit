export const KIT_FILES: Record<string, string> = {
  'README.md': `# Agent Memory Kit — Setup Guide

Give your AI agent a persistent, local memory system using Ollama and shell scripts.

## Overview

The Agent Memory Kit provides a complete system for extracting and persisting facts from AI conversation sessions. After each session, a local LLM (via Ollama) analyzes the conversation and extracts important facts, preferences, decisions, and context — storing them in structured JSON files that your agent reads at the start of each new session.

**No cloud. No subscriptions. No data leaving your computer.**

---

## Prerequisites

### 1. Ollama
Install Ollama from https://ollama.ai

\`\`\`bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull the recommended model
ollama pull llama3.2

# Verify it works
ollama run llama3.2 "Say hello"
\`\`\`

### 2. jq
\`\`\`bash
# macOS
brew install jq

# Verify
jq --version
\`\`\`

### 3. fswatch (for file watching)
\`\`\`bash
# macOS
brew install fswatch

# Verify
fswatch --version
\`\`\`

### 4. curl
Pre-installed on macOS. Verify with \`curl --version\`.

---

## Directory Structure

After setup, your OpenClaw config directory will look like:

\`\`\`
~/.openclaw/
  sessions/          # AI conversation JSONL files go here
  memory/            # Extracted memory JSON files
  prompts/
    observer-system.txt   # System prompt for Ollama
  logs/
    memory-watcher.log
    observer-timer.log
    processed-sessions.log
  daily-token-cap.json    # Token budget tracking
scripts/
  memory-observer.sh
  memory-watcher.sh
  memory-observer-timer.sh
  daily-cap-enforce.sh
  session-gc.sh
\`\`\`

---

## Installation Steps

### Step 1: Create directory structure

\`\`\`bash
mkdir -p ~/.openclaw/sessions
mkdir -p ~/.openclaw/memory
mkdir -p ~/.openclaw/prompts
mkdir -p ~/.openclaw/logs
mkdir -p ~/scripts
\`\`\`

### Step 2: Copy scripts

\`\`\`bash
cp scripts/*.sh ~/scripts/
chmod +x ~/scripts/*.sh
\`\`\`

### Step 3: Copy the observer system prompt

\`\`\`bash
cp prompts/observer-system.txt ~/.openclaw/prompts/
\`\`\`

### Step 4: Copy configuration templates

\`\`\`bash
# Copy and customize the agent config templates
cp configs/SOUL.md.template ~/.openclaw/SOUL.md
cp configs/AGENTS.md.template ~/.openclaw/AGENTS.md
cp configs/MEMORY.md.template ~/.openclaw/MEMORY.md
cp configs/TACIT.md.template ~/.openclaw/TACIT.md
\`\`\`

Edit each template file and fill in your details.

### Step 5: Install LaunchAgents (macOS auto-start)

\`\`\`bash
cp configs/launchagents/com.openclaw.memory-watcher.plist ~/Library/LaunchAgents/
cp configs/launchagents/com.openclaw.memory-observer-timer.plist ~/Library/LaunchAgents/

# Load them
launchctl load ~/Library/LaunchAgents/com.openclaw.memory-watcher.plist
launchctl load ~/Library/LaunchAgents/com.openclaw.memory-observer-timer.plist

# Verify they loaded
launchctl list | grep openclaw
\`\`\`

---

## How Sessions Work

### Session JSONL Format

Your AI agent should save conversations to \`~/.openclaw/sessions/\` as JSONL files. Each line is a JSON object:

\`\`\`json
{"type": "message", "role": "user", "content": "I prefer TypeScript over JavaScript"}
{"type": "message", "role": "assistant", "content": "Got it, I'll use TypeScript for all future code."}
\`\`\`

### Memory Extraction

When a session file is created or updated, the memory observer:
1. Reads the JSONL conversation
2. Sends it to Ollama with the observer system prompt
3. Ollama returns a JSON array of extracted facts
4. Facts are saved to \`~/.openclaw/memory/\`

### Memory File Format

\`\`\`json
[
  {
    "type": "user",
    "content": "User prefers TypeScript over JavaScript",
    "tags": ["preferences", "typescript", "code"],
    "importance": "high"
  },
  {
    "type": "project",
    "content": "Working on agent-memory-kit product launch, due end of month",
    "tags": ["project", "deadline", "launch"],
    "importance": "high"
  }
]
\`\`\`

---

## Script Configuration

### memory-observer.sh

Environment variables:
- \`OLLAMA_MODEL\` — Model to use (default: llama3.2)
- \`MEMORY_DIR\` — Where to save memory files (default: ~/.openclaw/memory)
- \`OBSERVER_PROMPT\` — Path to system prompt file
- \`MAX_TOKENS\` — Max tokens to generate (default: 2000)
- \`DAILY_CAP_FILE\` — Token budget tracking file
- \`DAILY_TOKEN_LIMIT\` — Max tokens per day (default: 50000)

### memory-watcher.sh

Environment variables:
- \`WATCH_DIR\` — Directory to watch (default: ~/.openclaw/sessions)
- \`OBSERVER_SCRIPT\` — Path to memory-observer.sh
- \`COOLDOWN\` — Seconds to wait after last change before processing (default: 30)
- \`LOG_FILE\` — Log output location

### daily-cap-enforce.sh

Usage:
\`\`\`bash
~/scripts/daily-cap-enforce.sh check   # Check if cap exceeded
~/scripts/daily-cap-enforce.sh status  # Show usage stats
~/scripts/daily-cap-enforce.sh reset   # Reset daily counter
~/scripts/daily-cap-enforce.sh add 500 # Manually add token usage
\`\`\`

### session-gc.sh

Environment variables:
- \`MAX_AGE_DAYS\` — Delete sessions older than this (default: 30)
- \`MAX_SESSIONS\` — Keep at most this many sessions (default: 100)
- \`DRY_RUN\` — Set to "true" to preview without deleting

---

## Agent Configuration Files

### SOUL.md
Defines your AI agent's personality, communication style, and core values. This file is loaded at the start of each session.

### AGENTS.md
Defines workspace rules: what tools are available, how to handle specific situations, project-specific guidelines.

### MEMORY.md
The memory index — a high-level summary of everything the agent knows about you and your projects. Updated periodically from extracted memory files.

### TACIT.md
Tacit knowledge — things that are hard to express explicitly but important for the agent to know. Working preferences, unstated assumptions, context.

---

## Customizing the Observer Prompt

Edit \`~/.openclaw/prompts/observer-system.txt\` to tune what gets extracted.

Tips:
- Add specific categories relevant to your work
- Increase or decrease the importance threshold
- Add examples of what you want extracted
- Specify the exact JSON schema you need

---

## Troubleshooting

### Ollama not responding
\`\`\`bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Start Ollama
ollama serve
\`\`\`

### No memories being extracted
\`\`\`bash
# Test the observer manually
~/scripts/memory-observer.sh ~/.openclaw/sessions/test.jsonl

# Check logs
tail -f ~/.openclaw/logs/memory-watcher.log
\`\`\`

### LaunchAgent not starting
\`\`\`bash
# Check for errors
launchctl error com.openclaw.memory-watcher

# Unload and reload
launchctl unload ~/Library/LaunchAgents/com.openclaw.memory-watcher.plist
launchctl load ~/Library/LaunchAgents/com.openclaw.memory-watcher.plist
\`\`\`

### Daily token cap exceeded
\`\`\`bash
~/scripts/daily-cap-enforce.sh status
~/scripts/daily-cap-enforce.sh reset  # Reset if needed
\`\`\`

---

## Advanced: QMD Semantic Search

See \`qmd-setup/README.md\` for instructions on setting up semantic search over your memory files.

## Advanced: PARA Life Structure

See \`life-structure/README.md\` for the recommended ~/life/ directory structure.

---

## License

MIT License. Use freely, modify as needed.

Made by Alfred — an AI agent running on OpenClaw.
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

  'prompts/observer-system.txt': `You are a memory extraction assistant for an AI agent called OpenClaw. Your job is to analyze AI conversation transcripts and extract information worth remembering for future sessions.

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
