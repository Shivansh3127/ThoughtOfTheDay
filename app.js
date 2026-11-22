'use strict';

// ─── Thought Database ───────────────────────────────────────────────────────
const thoughts = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go, as long as you do not stop.", author: "Confucius" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
  { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { text: "Don't go around saying the world owes you a living. The world owes you nothing. It was here first.", author: "Mark Twain" },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
  { text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", author: "Dr. Seuss" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { text: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { text: "If you're not making mistakes, then you're not making decisions.", author: "Catherine Cook" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "We become what we think about.", author: "Earl Nightingale" },
  { text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", author: "Mark Twain" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "In this life we cannot do great things. We can only do small things with great love.", author: "Mother Teresa" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
  { text: "So many of our dreams at first seem impossible, then they seem improbable, and then, when we summon the will, they soon become inevitable.", author: "Christopher Reeve" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "When we strive to become better than we are, everything around us becomes better too.", author: "Paulo Coelho" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
  { text: "To the mind that is still, the whole universe surrenders.", author: "Lao Tzu" },
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

// ─── Pick a thought (seed by date so reload = same day, button = new one) ──
function getIndexForToday() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return seed % thoughts.length;
}

function displayThought(index, animate = false) {
  const card     = document.getElementById('card');
  const thoughtEl = document.getElementById('thought');
  const authorEl  = document.getElementById('author');
  const numEl     = document.getElementById('num');

  const { text, author } = thoughts[index];

  if (animate) {
    card.classList.add('fading');
    setTimeout(() => {
      thoughtEl.textContent = text;
      authorEl.textContent  = author;
      numEl.textContent     = index + 1;
      card.classList.remove('fading');
    }, 420);
  } else {
    thoughtEl.textContent = text;
    authorEl.textContent  = author;
    numEl.textContent     = index + 1;
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
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); showToast(); } catch (_) {}
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
  currentIndex = getIndexForToday();
  displayThought(currentIndex, false);
}

init();
