// Simple tab switching logic
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab");
  const panels = {
    record: document.getElementById("tab-record"),
    wallet: document.getElementById("tab-wallet"),
    builder: document.getElementById("tab-builder"),
  };

  function activateTab(name) {
    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === name);
    });

    Object.entries(panels).forEach(([key, panel]) => {
      panel.classList.toggle("active", key === name);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateTab(btn.dataset.tab);
    });
  });

  // Make hero buttons jump into the app shell
  const heroButtons = document.querySelectorAll("[data-tab-target]");
  heroButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tabTarget;
      if (target && panels[target]) {
        activateTab(target);
        window.scrollTo({
          top: document.querySelector(".app-shell").offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});

// Genie helper logic
document.addEventListener("DOMContentLoaded", () => {
  const genieBtn = document.getElementById("genie-button");
  const genieModal = document.getElementById("genie-modal");
  const genieInput = document.getElementById("genie-input");
  const genieGenerate = document.getElementById("genie-generate");
  const genieResult = document.getElementById("genie-result");
  const genieCopy = document.getElementById("genie-copy-btn");
  const genieOpenExt = document.getElementById("genie-open-ext");

  if (!genieBtn || !genieModal) return;

  function openModal() {
    genieModal.style.display = "block";
    genieModal.setAttribute("aria-hidden", "false");
    genieInput.focus();
  }

  function closeModal() {
    genieModal.style.display = "none";
    genieModal.setAttribute("aria-hidden", "true");
  }

  genieBtn.addEventListener("click", () => {
    const visible = genieModal.style.display !== "none";
    if (visible) closeModal();
    else openModal();
  });

  // Generate a prompt tailored for the Genie / AI Quick Fix extension
  function buildPrompt(text, lang) {
    const header = "You are Genie, a helpful coding assistant.\n";
    const role = "Provide concise suggestions to fix the error and show minimal code diffs where appropriate.\n";
    const detect = lang && lang !== "auto" ? `Language: ${lang}\n` : "Language: auto-detect\n";
    const body = `Error / stack trace:\n${text.trim()}\n\nResponse format:\n1) Short explanation of the root cause.\n2) One or two minimal code changes (code blocks).\n3) Quick test or verification step.\n`;
    return header + role + detect + "\n" + body;
  }

  genieGenerate && genieGenerate.addEventListener("click", () => {
    const text = (genieInput && genieInput.value) || (window.getSelection && window.getSelection().toString()) || "";
    if (!text.trim()) {
      genieResult.style.display = "block";
      genieResult.textContent = "Paste or select an error message first.";
      return;
    }
    const lang = document.getElementById("genie-lang")?.value || "auto";
    const prompt = buildPrompt(text, lang);
    genieResult.style.display = "block";
    genieResult.textContent = prompt;
  });

  genieCopy && genieCopy.addEventListener("click", async () => {
    const content = genieResult && genieResult.style.display !== "none" ? genieResult.textContent : (genieInput && genieInput.value) || "";
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      genieCopy.textContent = "Copied";
      setTimeout(() => (genieCopy.textContent = "Copy"), 1500);
    } catch (e) {
      console.warn("Clipboard write failed", e);
      alert("Copy failed — select the text and use Ctrl+C to copy manually.");
    }
  });

  genieOpenExt && genieOpenExt.addEventListener("click", () => {
    // Open the extension's Marketplace page so user can install/open in VS Code
    const url = "https://marketplace.visualstudio.com/items?itemName=haselerdev.aiquickfix";
    window.open(url, "_blank");
  });
});
