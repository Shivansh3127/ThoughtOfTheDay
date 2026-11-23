'use strict';

// ─── Thought Database ───────────────────────────────────────────────────────
const thoughts = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Honesty is the best policy", author: "God" },
  { text: "God is Great ", author: "Shivansh" },
  { text: "Always brings Peace ", author: "Shivansh" },
];

// ─── State ──────────────────────────────────────────────────────────────────
let currentIndex = 0;
let toastTimer = null;

// ─── Starfield ──────────────────────────────────────────────────────────────
function buildStars() {
  const container = document.getElementById('stars');
  const count = 120;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `top:${Math.random() * 100}%`,
      `left:${Math.random() * 100}%`,
      `--d:${(Math.random() * 4 + 2).toFixed(1)}s`,
      `--o:${(Math.random() * 0.5 + 0.3).toFixed(2)}`,
      `animation-delay:${(Math.random() * 5).toFixed(1)}s`,
    ].join(';');
    fragment.appendChild(s);
  }
  container.appendChild(fragment);
}

// ─── Pick a random thought (different every reload) ─────────────────────────
function randomIndex() {
  return Math.floor(Math.random() * thoughts.length);
}

function displayThought(index, animate = false) {
  const card = document.getElementById('card');
  const thoughtEl = document.getElementById('thought');
  const authorEl = document.getElementById('author');
  const numEl = document.getElementById('num');

  const { text, author } = thoughts[index];

  if (animate) {
    card.classList.add('fading');
    setTimeout(() => {
      thoughtEl.textContent = text;
      authorEl.textContent = author;
      numEl.textContent = index + 1;
      card.classList.remove('fading');
    }, 420);
  } else {
    thoughtEl.textContent = text;
    authorEl.textContent = author;
    numEl.textContent = index + 1;
  }
}

// ─── New Thought (random, different from current) ───────────────────────────
function newThought() {
  let next;
  do { next = Math.floor(Math.random() * thoughts.length); }
  while (next === currentIndex && thoughts.length > 1);
  currentIndex = next;
  displayThought(currentIndex, true);
}

// ─── Copy to clipboard ───────────────────────────────────────────────────────
function copyThought() {
  const { text, author } = thoughts[currentIndex];
  const content = `"${text}" — ${author}`;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(content).then(showToast);
  } else {
    // Fallback for non-secure contexts
    const ta = document.createElement('textarea');
    ta.value = content;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); showToast(); } catch (_) { }
    document.body.removeChild(ta);
  }
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── Keyboard shortcut ───────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); newThought(); }
  if (e.key === 'c' || e.key === 'C') copyThought();
});

// ─── Init ────────────────────────────────────────────────────────────────────
function init() {
  document.getElementById('total').textContent = thoughts.length;
  buildStars();
  currentIndex = randomIndex();   // pure random on every page load / reload
  displayThought(currentIndex, false);
}

init();
