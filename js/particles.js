/* ==========================================================================
   Lightweight canvas particle network background — connects nearby dots
   with lines, reacts subtly to mouse movement. Pure vanilla JS, no deps.
   ========================================================================== */

(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, particles = [];
  const MAX_DIST = 140;
  const MOUSE_RADIUS = 160;
  const mouse = { x: null, y: null };

  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function initParticles() {
    const isSmallScreen = width < 700;
    const maxCount = isSmallScreen ? 40 : 90;
    const divisor = isSmallScreen ? 22000 : 16000;
    const count = Math.min(maxCount, Math.floor((width * height) / divisor));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    const dotColor = isDark() ? 'rgba(140,160,255,0.55)' : 'rgba(90,70,200,0.45)';
    const lineColorBase = isDark() ? '99,132,255' : '110,80,220';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const opacity = 1 - dist / MAX_DIST;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${lineColorBase},${opacity * 0.35})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
  }

  function step() {
    if (!isRunning) return;
    render();
    requestAnimationFrame(step);
  }

  let resizeTimer = null;
  function debouncedResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }

  let isRunning = true;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      isRunning = false;
    } else if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(step);
    }
  });

  window.addEventListener('resize', debouncedResize);
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  requestAnimationFrame(step);
})();
