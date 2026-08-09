// mobile nav
const burger = document.getElementById('burger');
const navlinks = document.getElementById('navlinks');
if(burger){ burger.addEventListener('click', () => navlinks.classList.toggle('open')); }

// nav bg on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  const bar = document.getElementById('progress');
  if(bar) bar.style.width = pct + '%';
});

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// stagger index vars
document.querySelectorAll('.reveal-stagger').forEach(group => {
  [...group.children].forEach((c,i) => c.style.setProperty('--i', i));
});

// split text into spans for rise animation, with delay based on order
document.querySelectorAll('.split-line span').forEach((el,i) => {
  el.style.animationDelay = (0.15 + i*0.12) + 's';
});

// custom cursor (desktop only)
const cursor = document.querySelector('.cursor-dot');
if(cursor && matchMedia('(pointer:fine)').matches){
  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .magnetic, .card, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

// magnetic buttons
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.18}px, ${y*0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0,0)');
});

// count-up numbers
const counters = document.querySelectorAll('.fact-num[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const isNum = /^\d+$/.test(target);
      if(isNum){
        let cur = 0; const goal = parseInt(target,10);
        const step = Math.max(1, Math.ceil(goal/40));
        const t = setInterval(() => {
          cur += step;
          if(cur >= goal){ cur = goal; clearInterval(t); }
          el.textContent = cur + suffix;
        }, 30);
      } else {
        el.textContent = target;
      }
      cio.unobserve(el);
    }
  });
}, {threshold:0.4});
counters.forEach(c => cio.observe(c));

// mark active nav link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navlinks a[data-page]').forEach(a => {
  if(a.dataset.page === path) a.classList.add('active');
});
