const GALLERY_LABELS = [
  'Gece Devriyesi', 'K9 Operasyonu', 'Özel Operasyon', 'Akademi Eğitimi',
  'Toplum Etkinliği', 'Hava Destek Birimi', 'Silah Eğitimi', 'Terfi Töreni'
];

function applyGallery() {
  const saved = JSON.parse(localStorage.getItem('lasd_gallery') || '{}');
  document.querySelectorAll('.gallery-item[data-gallery-id]').forEach(item => {
    const id = item.dataset.galleryId;
    const adminUrl = saved[id];
    const autoUrl = adminUrl || `resimler/foto${id}.png`;
    const ph = item.querySelector('.placeholder-img');
    let img = item.querySelector('.g-img');
    if (!img) { img = document.createElement('img'); img.className = 'g-img'; item.insertBefore(img, item.firstChild); }
    img.alt = GALLERY_LABELS[parseInt(id) - 1] || '';
    img.onerror = function() { this.remove(); if (ph) ph.style.display = ''; };
    img.onload  = function() { if (ph) ph.style.display = 'none'; };
    img.src = autoUrl;
  });
}

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const scrollSpy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => scrollSpy.observe(s));

/* ─────────────────────────── LIGHTBOX ─────────────────────────── */
const lbOverlay = document.getElementById('lb-overlay');
const lbImg     = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
let lbItems = [];
let lbIndex = 0;

function lbOpen(items, idx) {
  lbItems = items; lbIndex = idx; lbShow();
  lbOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function lbClose() {
  lbOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
function lbShow() {
  const it = lbItems[lbIndex];
  lbImg.src = it.src;
  lbCaption.textContent = it.caption || '';
}
function lbPrev() { lbIndex = (lbIndex - 1 + lbItems.length) % lbItems.length; lbShow(); }
function lbNext() { lbIndex = (lbIndex + 1) % lbItems.length; lbShow(); }

document.getElementById('lb-close').addEventListener('click', lbClose);
document.getElementById('lb-prev').addEventListener('click', e => { e.stopPropagation(); lbPrev(); });
document.getElementById('lb-next').addEventListener('click', e => { e.stopPropagation(); lbNext(); });
lbOverlay.addEventListener('click', e => { if (e.target === lbOverlay || e.target === lbImg) lbClose(); });
document.addEventListener('keydown', e => {
  if (!lbOverlay.classList.contains('open')) return;
  if (e.key === 'Escape')      lbClose();
  if (e.key === 'ArrowLeft')   lbPrev();
  if (e.key === 'ArrowRight')  lbNext();
});

function initLightbox() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (!item.querySelector('.gallery-zoom-icon')) {
      const z = document.createElement('div');
      z.className = 'gallery-zoom-icon';
      z.innerHTML = '&#128269;';
      item.appendChild(z);
    }
    item.addEventListener('click', () => {
      const allItems = Array.from(document.querySelectorAll('.gallery-item'));
      const visibleItems = allItems.map(gi => {
        const img = gi.querySelector('.g-img');
        if (!img || !img.complete || img.naturalWidth === 0) return null;
        const h4 = gi.querySelector('.gallery-overlay h4');
        return { src: img.src, caption: h4 ? h4.textContent : '' };
      }).filter(Boolean);
      const clickedImg = item.querySelector('.g-img');
      if (!clickedImg || !clickedImg.complete || clickedImg.naturalWidth === 0) return;
      const idx = visibleItems.findIndex(vi => vi.src === clickedImg.src);
      if (idx < 0) return;
      lbOpen(visibleItems, idx);
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  applyGallery();
  initLightbox();
});
