// Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (el.style.display = "none"), 1700);
}

// Theme
function setTheme(next) {
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

/**
 * ✅ INIT THEME: mặc định "light" nếu chưa có theme trong localStorage
 * - Lần đầu mở: light
 * - Các lần sau: dùng theme đã lưu
 */
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const defaultTheme = "light";
  const themeToUse = saved || defaultTheme;

  document.documentElement.setAttribute("data-theme", themeToUse);

  // nếu chưa lưu thì lưu luôn light để lần sau giữ nguyên
  if (!saved) localStorage.setItem("theme", defaultTheme);
})();

function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme") || "light";
  const next = cur === "dark" ? "light" : "dark";
  setTheme(next);
  toast("Theme: " + next);
}

$("#themeBtn")?.addEventListener("click", toggleTheme);
$("#printBtn")?.addEventListener("click", () => window.print());

// Copy email
$("#copyEmailBtn")?.addEventListener("click", async () => {
  const email = $("#emailText")?.textContent?.trim() || "";
  try {
    await navigator.clipboard.writeText(email);
    toast("Copied: " + email);
  } catch {
    toast("Copy failed (permission).");
  }
});

// Smooth scroll
$$(".nav a").forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href?.startsWith("#")) return;
    e.preventDefault();
    const target = $(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  });
});

// Footer year
$("#year") && ($("#year").textContent = new Date().getFullYear());