/* ============================================================
   Portfolio interactions — vanilla JS, no dependencies.
   ============================================================ */
(function () {
  "use strict";

  /* ── Theme (persisted, falls back to OS preference) ──── */
  var root = document.documentElement;
  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));

  document.getElementById("themeToggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ── Sticky nav background ───────────────────────────── */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    nav.classList.toggle("is-stuck", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Mobile menu ─────────────────────────────────────── */
  var burger = document.getElementById("burger");
  var links = document.querySelector(".nav__links");
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("is-open");
      burger.classList.remove("is-open");
    }
  });

  /* ── Reveal on scroll ────────────────────────────────── */
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        // Stagger siblings that enter together for a softer cascade.
        entry.target.style.transitionDelay = Math.min(i * 70, 280) + "ms";
        entry.target.classList.add("is-in");
        revealer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealables.forEach(function (el) { revealer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ── Active section highlighting in nav ──────────────── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Footer year ─────────────────────────────────────── */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
