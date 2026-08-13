(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = document.querySelector('[data-clock]');
  const greeting = document.querySelector('[data-greeting]');
  const progress = document.querySelector('[data-progress]');

  const tick = () => {
    const now = new Date();
    if (clock) clock.textContent = new Intl.DateTimeFormat('zh-CN', {
      timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).format(now);
    if (greeting) {
      const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Shanghai', hour: '2-digit', hour12: false }).format(now));
      greeting.textContent = hour < 6 ? '夜深了，适合把问题想明白。' : hour < 12 ? '早上好。今天也从一个小问题开始。' : hour < 18 ? '午后在途，继续把想法做成东西。' : '天色渐暗，欢迎来到我的夜航日志。';
    }
  };
  tick();
  if (clock) window.setInterval(tick, 1000);

  const updateProgress = () => {
    if (!progress) return;
    const total = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${total > 0 ? Math.min(100, scrollY / total * 100) : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Article content must never depend on JavaScript to remain readable.
  const reveals = [...document.querySelectorAll('.reveal:not(.article-shell .reveal)')];
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -30px' });
    reveals.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
      observer.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  const nightWindow = document.querySelector('[data-window]');
  if (nightWindow && !reduced) {
    nightWindow.addEventListener('pointermove', (event) => {
      const rect = nightWindow.getBoundingClientRect();
      nightWindow.style.setProperty('--mx', `${event.clientX - rect.left - rect.width / 2}px`);
      nightWindow.style.setProperty('--my', `${event.clientY - rect.top - rect.height / 2}px`);
    });
    nightWindow.addEventListener('pointerleave', () => {
      nightWindow.style.setProperty('--mx', '0px');
      nightWindow.style.setProperty('--my', '0px');
    });
  }
})();
