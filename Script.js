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
