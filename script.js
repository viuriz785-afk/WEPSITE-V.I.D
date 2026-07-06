// =====================
// PORTFOLIO DATA
// =====================
const projects = [
  { category:'Wedding Film', name:'Rizky & Putri — Batam 2024', desc:'Film pernikahan sinematik yang mengabadikan setiap momen berharga dengan pendekatan storytelling yang emosional dan sinematik.', tags:['Cinematic','4K','SDE','Highlight'], bg:'linear-gradient(135deg,#1a1208 0%,#2d1e08 40%,#0d0d0d 100%)', video:'https://drive.google.com/file/d/1obxyTHGFfHQO9xo4h9adxHwQz5L7ekY6/preview' },
  { category:'Commercial Video', name:'Brand Campaign — Local Brand', desc:'Video kampanye brand lokal dengan visual storytelling yang kuat, menonjolkan identitas dan nilai produk secara sinematik.', tags:['TVC','Brand Film','4K','Color Grade'], bg:'linear-gradient(135deg,#0d1520 0%,#1a2030 100%)', video:'' },
  { category:'Company Profile', name:'PT. Harmoni — Corporate Film', desc:'Film profil perusahaan yang profesional dan elegan, menampilkan identitas, nilai, dan visi perusahaan secara visual yang berkesan.', tags:['Corporate','Documentary','4K'], bg:'linear-gradient(135deg,#1a0d08 0%,#2d1508 100%)', video:'' },
  { category:'Event Documentation', name:'Batam Business Summit', desc:'Dokumentasi lengkap acara bisnis bergengsi di Batam, mencakup highlight keynote, networking, dan momen-momen penting event.', tags:['Event','Highlight','Multi-Cam'], bg:'linear-gradient(135deg,#0d1a10 0%,#0d2010 100%)', video:'' },
  { category:'Content Creation', name:'Social Media Series — UMKM', desc:'Seri konten kreatif untuk media sosial UMKM lokal, dirancang untuk meningkatkan engagement dan brand awareness secara konsisten.', tags:['Reels','Social Media','Series'], bg:'linear-gradient(135deg,#1a0d14 0%,#2d0d20 100%)', video:'' },
  { category:'Wedding Film', name:'Sinematic Wedding — 2024', desc:'Film pernikahan dengan pendekatan dokumenter sinematik yang natural, merekam setiap emosi dan cerita di hari istimewa Anda.', tags:['Cinematic','Documentary','4K','SDE'], bg:'linear-gradient(135deg,#1a1208 0%,#302010 100%)', video:'' },
];

let currentIdx = 0;

// =====================
// LIGHTBOX
// =====================
function openLightbox(idx) {
  currentIdx = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  // stop video
  const iframe = document.getElementById('lbIframe');
  iframe.src = '';
  iframe.style.display = 'none';
  document.getElementById('lbPlayBtn').style.display = 'flex';
}

function updateLightbox() {
  const p = projects[currentIdx];
  const bg = document.getElementById('lbBg');
  const iframe = document.getElementById('lbIframe');
  const playBtn = document.getElementById('lbPlayBtn');

  iframe.style.display = 'none';
  iframe.src = '';
  playBtn.style.display = 'flex';
  playBtn.style.opacity = '1';
  bg.style.background = p.bg;

  if (p.video) {
    playBtn.onclick = () => {
      iframe.src = p.video;
      iframe.style.display = 'block';
      playBtn.style.display = 'none';
    };
  } else {
    playBtn.onclick = null;
    playBtn.style.opacity = '0.3';
    playBtn.title = 'Video belum tersedia';
  }

  document.getElementById('lbCategory').textContent = p.category;
  document.getElementById('lbTitle').textContent = p.name;
  document.getElementById('lbDesc').textContent = p.desc;
  document.getElementById('lbCounter').textContent = (currentIdx + 1) + ' / ' + projects.length;
  const tags = document.getElementById('lbTags');
  tags.innerHTML = p.tags.map(t => `<span class="lb-tag">${t}</span>`).join('');
}

function nextProject() {
  currentIdx = (currentIdx + 1) % projects.length;
  updateLightbox();
}

function prevProject() {
  currentIdx = (currentIdx - 1 + projects.length) % projects.length;
  updateLightbox();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextProject();
  if (e.key === 'ArrowLeft') prevProject();
});

// =====================
// PORTFOLIO FILTER
// =====================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.port-item').forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

// =====================
// COUNTER ANIMATION
// =====================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const text = el.dataset.text;
  if (text) { el.textContent = text; return; }
  const dur = 1800, steps = 60, inc = target / steps;
  let cur = 0, count = 0;
  const timer = setInterval(() => {
    count++;
    cur = Math.min(Math.round(inc * count), target);
    el.textContent = cur + suffix;
    if (cur >= target) clearInterval(timer);
  }, dur / steps);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObs.observe(statsBar);

// =====================
// SCROLL REVEAL
// =====================
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .port-item, .service-card, .value-item, .wa-float').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '14px';
    cursor.style.height = '14px';
    ring.style.width = '56px';
    ring.style.height = '56px';
    ring.style.borderColor = 'rgba(192,57,43,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(192,57,43,0.5)';
  });
});

// =====================
// NAV SCROLL
// =====================
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// =====================
// HAMBURGER MENU
// =====================
function toggleMobile() {
  const h = document.getElementById('hamburger');
  const m = document.getElementById('mobileMenu');
  h.classList.toggle('open');
  m.classList.toggle('open');
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}

function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// =====================
// PAGE TRANSITION
// =====================
const pt = document.getElementById('pageTransition');

function runTransition(cb) {
  pt.classList.remove('leave');
  pt.classList.add('enter');
  setTimeout(() => {
    cb();
    setTimeout(() => {
      pt.classList.remove('enter');
      pt.classList.add('leave');
    }, 100);
  }, 520);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    runTransition(() => t.scrollIntoView({ behavior: 'instant' }));
  });
});

// =====================
// FORM SUBMIT
// =====================
document.querySelector('.btn-submit').addEventListener('click', () => {
  alert('Terima kasih! Tim V.I.D Studio akan menghubungi Anda segera. 🎬');
});
