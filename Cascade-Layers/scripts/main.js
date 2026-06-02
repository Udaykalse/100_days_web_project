const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('main-nav');
const scrollTopBtn = document.getElementById('scrollTop');
const bookmarkBtn = document.getElementById('bookmarkBtn');
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const searchInput = document.getElementById('searchInput');
const cardsGrid = document.getElementById('cardsGrid');
const noResults = document.getElementById('noResults');
const searchTerm = document.getElementById('searchTerm');
const selectorInput = document.getElementById('selectorInput');
const calcBtn = document.getElementById('calcBtn');
const specA = document.getElementById('specA');
const specB = document.getElementById('specB');
const specC = document.getElementById('specC');
const specVerdict = document.getElementById('specVerdict');

const state = {
  theme: localStorage.getItem('theme') || 'light',
  liked: false,
  likeCount: 128,
  bookmarked: false,
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '○' : '◐';
  localStorage.setItem('theme', theme);
}

applyTheme(state.theme);

themeToggle.addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(state.theme);
});

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  const show = window.scrollY > 400;
  scrollTopBtn.classList.toggle('visible', show);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

likeBtn.addEventListener('click', () => {
  state.liked = !state.liked;
  state.likeCount = state.liked ? state.likeCount + 1 : state.likeCount - 1;
  likeBtn.classList.toggle('liked', state.liked);
  likeCount.textContent = state.likeCount;

  likeBtn.style.transform = 'scale(1.25)';
  setTimeout(() => { likeBtn.style.transform = ''; }, 200);
});

bookmarkBtn.addEventListener('click', () => {
  state.bookmarked = !state.bookmarked;
  bookmarkBtn.classList.toggle('active', state.bookmarked);
});

const cards = Array.from(cardsGrid.querySelectorAll('.card'));

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  let visible = 0;

  cards.forEach(card => {
    const topic = card.dataset.topic || '';
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
    const match = !query || topic.includes(query) || title.includes(query) || desc.includes(query);
    card.classList.toggle('hidden', !match);
    if (match) visible++;
  });

  noResults.style.display = visible === 0 ? 'block' : 'none';
  searchTerm.textContent = query;
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.blur();
  }
});

function calculateSpecificity(selector) {
  let ids = 0, classes = 0, elements = 0;

  const cleaned = selector
    .replace(/::?[\w-]+(\(.*?\))?/g, match => {
      if (/^::(before|after|first-line|first-letter|selection|placeholder)/.test(match)) {
        elements++;
        return '';
      }
      return '';
    });

  const noAttr = cleaned.replace(/\[.*?\]/g, () => { classes++; return ''; });
  const noId = noAttr.replace(/#[\w-]+/g, () => { ids++; return ''; });
  const noClass = noId.replace(/\.[\w-]+/g, () => { classes++; return ''; });
  const noCombi = noClass.replace(/[>+~\s]+/g, ' ').trim();

  noCombi.split(/\s+/).forEach(part => {
    const clean = part.replace(/[+~>]/g, '').trim();
    if (clean && clean !== '*') {
      const elMatches = clean.match(/^[\w-]+/);
      if (elMatches) elements++;
    }
  });

  return { ids, classes, elements };
}

function getVerdict(ids, classes, elements) {
  if (ids > 0 && classes === 0 && elements === 0) return 'High specificity — ID selectors are very powerful. Consider if a class selector could work instead.';
  if (ids > 1) return 'Very high specificity — multiple IDs make this nearly impossible to override without !important or cascade layers.';
  if (ids === 0 && classes === 0 && elements === 0) return 'No specificity — this selector has zero weight (e.g., * or :where()).';
  if (ids === 0 && classes === 0) return 'Low specificity — element selectors are easily overridden by class selectors.';
  if (ids === 0 && classes <= 2) return 'Moderate specificity — a good range for reusable component styles.';
  return 'Complex selector — consider simplifying or using @layer to manage precedence.';
}

function animateNumber(el, value) {
  const current = parseInt(el.textContent, 10);
  if (current === value) return;
  el.style.transform = 'scale(1.3)';
  el.style.color = value > 0 ? 'var(--primary)' : 'var(--text-subtle)';
  el.textContent = value;
  setTimeout(() => { el.style.transform = ''; }, 200);
}

function runCalculator() {
  const selector = selectorInput.value.trim();
  if (!selector) return;

  const { ids, classes, elements } = calculateSpecificity(selector);
  animateNumber(specA, ids);
  animateNumber(specB, classes);
  animateNumber(specC, elements);
  specVerdict.textContent = getVerdict(ids, classes, elements);
}

calcBtn.addEventListener('click', runCalculator);
selectorInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') runCalculator();
});

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const codeId = btn.dataset.code;
    const codeEl = document.getElementById(codeId);
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

const layerCards = document.querySelectorAll('.layer-card');
layerCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    layerCards.forEach(c => c.style.opacity = c === card ? '1' : '0.4');
  });
  card.addEventListener('mouseleave', () => {
    layerCards.forEach(c => c.style.opacity = '1');
  });
});

const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = document.querySelectorAll('section[id], main[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(section => observer.observe(section));

const animatedEls = document.querySelectorAll('.card, .featured-article, .specificity-calculator');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

animatedEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 0.06}s ease, transform 0.5s ${i * 0.06}s ease`;
  fadeObserver.observe(el);
});