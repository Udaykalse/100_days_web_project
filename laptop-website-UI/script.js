const cart = [];
const prices = {
  '14': 1799,
  '16': 2499,
  'Essential 14"': 1299,
  'Pro 14"': 1799,
  'Ultra 16"': 2499
};

let selectedSize = '14';

const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const addToCartBtn = document.getElementById('addToCart');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

function openCartPanel() {
  cartPanel.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartPanel() {
  cartPanel.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCartPanel);
closeCart.addEventListener('click', closeCartPanel);
cartOverlay.addEventListener('click', closeCartPanel);

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  if (nav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = btn.dataset.size;
  });
});

document.querySelectorAll('.dot').forEach(dot => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function updateCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
    cartFooter.style.display = 'none';
    cartCount.classList.remove('visible');
    return;
  }

  cartItems.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toLocaleString()}</div>
      </div>
      <button class="cart-item-remove" data-index="${i}">Remove</button>
    </div>
  `).join('');

  cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      cart.splice(idx, 1);
      updateCart();
    });
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `$${total.toLocaleString()}`;
  cartFooter.style.display = 'flex';
  cartCount.textContent = cart.length;
  cartCount.classList.add('visible');
}

addToCartBtn.addEventListener('click', () => {
  const name = `Three Dots ${selectedSize}"`;
  const price = prices[selectedSize] || 1799;
  cart.push({ name, price });
  updateCart();
  showToast(`${name} added to cart`);
});

document.querySelectorAll('.model-cta').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = `Three Dots ${btn.dataset.name}`;
    const price = prices[btn.dataset.name] || 1799;
    cart.push({ name, price });
    updateCart();
    showToast(`${name} added to cart`);
  });
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.background = 'rgba(13,13,18,0.95)';
  } else {
    header.style.background = 'rgba(13,13,18,0.8)';
  }
}, { passive: true });

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.model-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});