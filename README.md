# aria-one-webapp

ARIA ONE — small demo webapp. This repo includes a tiny helper to format error messages as prompts for the VS Code extension "AI Quick Fix / Genie" (https://marketplace.visualstudio.com/items?itemName=haselerdev.aiquickfix).

**Genie integration**
- Web UI: open `index.html` in your browser and click the floating `🪄 Genie` button (bottom-right). Paste an error or stack trace, choose a language, click `Generate`, then `Copy` to copy a ready-to-paste prompt for the extension.
- CLI helper: `scripts/genie_prompt.sh` will format stdin or a passed string into a Genie-friendly prompt and attempt to copy it to your clipboard.

Why: the web UI lets you quickly craft a single, focused prompt you can paste into the extension (or any LLM) so you can iterate on fixes locally in VS Code.

Usage

- Web: open `index.html` in a browser. Paste the error and click `Generate` → `Copy`. Then paste into the Genie input inside VS Code.
- CLI: on Linux/macOS, run:

```bash
# from repo root
./scripts/genie_prompt.sh "TypeError: x is not a function at foo (app.js:12:5)"
# or pipe a stack trace
echo "ReferenceError: y is not defined" | ./scripts/genie_prompt.sh
```

Notes

- The web UI cannot directly call a VS Code extension from the browser. It prepares and copies a high-quality prompt for you to paste into the extension, which runs inside VS Code.
- The CLI helper tries common clipboard utilities (`wl-copy`, `xclip`, `pbcopy`) and will print the prompt if no clipboard helper is found.

If you'd like, I can open a PR with these changes (includes `index.html`/`Script.js` updates and `scripts/genie_prompt.sh`).

