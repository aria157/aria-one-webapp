#!/usr/bin/env bash
set -euo pipefail

# genie_prompt.sh
# Format an error/stack trace into a prompt suited for the "AI Quick Fix / Genie" extension
# Usage: ./scripts/genie_prompt.sh "Error message..."
# Or: cat trace.txt | ./scripts/genie_prompt.sh

read_input=""
if [ "$#" -ge 1 ]; then
  read_input="$*"
else
  # read from stdin
  if [ -t 0 ]; then
    echo "Usage: $0 \"error message\" or pipe a stack trace" >&2
    exit 2
  fi
  read_input=$(cat -)
fi

lang="auto"
prompt_header="You are Genie, a helpful coding assistant.\n"
prompt_role="Provide concise suggestions to fix the error and show minimal code diffs where appropriate.\n"
prompt_detect="Language: ${lang}\n\n"
prompt_body="Error / stack trace:\n${read_input}\n\nResponse format:\n1) Short explanation of the root cause.\n2) One or two minimal code changes (code blocks).\n3) Quick test or verification step.\n"

full_prompt="${prompt_header}${prompt_role}${prompt_detect}${prompt_body}"

# print to stdout so caller can see it
printf "%s\n" "$full_prompt"

# Try copying to clipboard using common tools
if command -v wl-copy >/dev/null 2>&1; then
  printf "%s" "$full_prompt" | wl-copy && echo "(copied to clipboard via wl-copy)"
elif command -v xclip >/dev/null 2>&1; then
  printf "%s" "$full_prompt" | xclip -selection clipboard && echo "(copied to clipboard via xclip)"
elif command -v pbcopy >/dev/null 2>&1; then
  printf "%s" "$full_prompt" | pbcopy && echo "(copied to clipboard via pbcopy)"
else
  echo "(no clipboard helper found; prompt printed above — select and copy manually)" >&2
fi
