/* ==========================================================================
   Advanced Portfolio — Main interactions & rendering logic
   Pure vanilla JS, no build step required.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     0. Loader
  --------------------------------------------------------------------- */
  window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    setTimeout(function () {
      if (loader) loader.classList.add('is-hidden');
    }, 500);
  });

  /* ---------------------------------------------------------------------
     1. Custom cursor
  --------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    (function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll('a, button, .project-card, .mindmap__hub').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursorRing.style.width = '54px'; cursorRing.style.height = '54px';
        cursorRing.style.borderColor = 'var(--accent-2)';
      });
      el.addEventListener('mouseleave', function () {
        cursorRing.style.width = '34px'; cursorRing.style.height = '34px';
        cursorRing.style.borderColor = 'var(--accent-1)';
      });
    });
  } else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
  }

  /* ---------------------------------------------------------------------
     2. Scroll progress bar + nav scrolled state + scroll-spy
  --------------------------------------------------------------------- */
  const progressBar = document.getElementById('progressBar');
  const nav = document.getElementById('nav');
  const toTopBtn = document.getElementById('toTop');
  const toTopProgress = document.getElementById('toTopProgress');
  const TO_TOP_RING_CIRCUMFERENCE = 119.4;
  const navLinkEls = Array.from(document.querySelectorAll('.nav__link'));
  const sectionsForSpy = navLinkEls
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);

  let scrollTicking = false;
  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    if (nav) nav.classList.toggle('is-scrolled', scrollTop > 40);
    if (toTopBtn) toTopBtn.classList.toggle('is-visible', scrollTop > 600);
    if (toTopProgress) {
      const offset = TO_TOP_RING_CIRCUMFERENCE - (pct / 100) * TO_TOP_RING_CIRCUMFERENCE;
      toTopProgress.style.strokeDashoffset = String(offset);
    }
    scrollTicking = false;
  }
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(handleScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if ('IntersectionObserver' in window && sectionsForSpy.length) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const id = entry.target.id;
        const link = navLinkEls.find(function (l) { return l.getAttribute('href') === '#' + id; });
        if (link) link.classList.toggle('is-active', entry.isIntersecting);
        const dot = document.querySelector('.dot-nav__dot[href="#' + id + '"]');
        if (dot) dot.classList.toggle('is-active', entry.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sectionsForSpy.forEach(function (s) { spy.observe(s); });
  }

  /* ---------------------------------------------------------------------
     3. Mobile nav burger
  --------------------------------------------------------------------- */
  const burger = document.getElementById('navBurger');
  const navLinksContainer = document.getElementById('navLinks');
  if (burger && navLinksContainer) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      navLinksContainer.classList.toggle('is-open');
    });
    navLinkEls.forEach(function (l) {
      l.addEventListener('click', function () {
        burger.classList.remove('is-active');
        navLinksContainer.classList.remove('is-open');
      });
    });
  }

  /* ---------------------------------------------------------------------
     4. Theme toggle (persisted)
  --------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  let storedTheme = null;
  try { storedTheme = localStorage.getItem('advportfolio-theme'); } catch (e) { /* ignore */ }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.querySelector('.theme-toggle__icon').textContent = theme === 'light' ? '☀️' : '🌙';
    }
  }
  applyTheme(storedTheme === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(current);
      try { localStorage.setItem('advportfolio-theme', current); } catch (e) { /* ignore */ }
    });
  }

  /* ---------------------------------------------------------------------
     4b. Keyboard shortcuts modal + global hotkeys
  --------------------------------------------------------------------- */
  const shortcutsModal = document.getElementById('shortcutsModal');
  const shortcutsBtn = document.getElementById('shortcutsBtn');
  const shortcutsModalClose = document.getElementById('shortcutsModalClose');

  function openShortcutsModal() {
    if (!shortcutsModal) return;
    shortcutsModal.classList.add('is-open');
    shortcutsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeShortcutsModal() {
    if (!shortcutsModal) return;
    shortcutsModal.classList.remove('is-open');
    shortcutsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (shortcutsBtn) shortcutsBtn.addEventListener('click', openShortcutsModal);
  if (shortcutsModalClose) shortcutsModalClose.addEventListener('click', closeShortcutsModal);
  if (shortcutsModal) {
    shortcutsModal.addEventListener('click', function (e) { if (e.target === shortcutsModal) closeShortcutsModal(); });
  }

  document.addEventListener('keydown', function (e) {
    const tag = (e.target && e.target.tagName) || '';
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

    if (e.key === 'Escape') {
      if (shortcutsModal && shortcutsModal.classList.contains('is-open')) closeShortcutsModal();
    }
    if (!isTyping && e.shiftKey && e.key === '?') {
      e.preventDefault();
      openShortcutsModal();
    }
    if (!isTyping && (e.key === 't' || e.key === 'T')) {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(current);
      try { localStorage.setItem('advportfolio-theme', current); } catch (err) { /* ignore */ }
    }
  });

  /* ---------------------------------------------------------------------
     5. Reveal-on-scroll animations
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------------------
     6. Typed role text + typed name effect
  --------------------------------------------------------------------- */
  const typedRoleEl = document.getElementById('typedRole');
  if (typedRoleEl && window.PROFILE) {
    const roles = window.PROFILE.roles || [window.PROFILE.title];
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const currentRole = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedRoleEl.textContent = currentRole.substring(0, charIndex);
        if (charIndex === currentRole.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        typedRoleEl.textContent = currentRole.substring(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ---------------------------------------------------------------------
     7. Animated counters
  --------------------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-counter]');
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (target - start) * eased;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------------------------------------------------------------------
     8. Render dynamic sections from data.js
  --------------------------------------------------------------------- */
  const P = window.PROFILE || {};

  // Apply profile overrides from localStorage (editable by modal)
  try {
    const stored = localStorage.getItem('advportfolio-profile-override');
    if (stored) {
      const o = JSON.parse(stored);
      Object.assign(P, o);
    }
  } catch (e) { /* ignore parse errors */ }

  // Render hero fields (name, summary, stats, avatar, resume)
  const typedNameEl = document.getElementById('typedName');
  const heroDescEl = document.querySelector('.hero__desc');
  const heroAvatarEl = document.querySelector('.hero-card__avatar');
  const resumeLink = document.querySelector('.hero__cta a[href$="Resume.pdf"]');
  if (typedNameEl && P.fullName) typedNameEl.textContent = P.fullName;
  if (heroDescEl && P.summary) heroDescEl.textContent = P.summary;
  if (resumeLink && P.resumeUrl) resumeLink.href = P.resumeUrl;
  if (heroAvatarEl) {
    if (P.avatar) {
      heroAvatarEl.style.backgroundImage = 'url(' + P.avatar + ')';
      heroAvatarEl.textContent = '';
      heroAvatarEl.style.backgroundSize = 'cover';
      heroAvatarEl.style.backgroundPosition = 'center';
    } else if (P.photoUrl) {
      heroAvatarEl.style.backgroundImage = 'url(' + P.photoUrl + ')';
      heroAvatarEl.textContent = '';
      heroAvatarEl.style.backgroundSize = 'cover';
      heroAvatarEl.style.backgroundPosition = 'center';
    } else {
      heroAvatarEl.textContent = P.initials || (P.fullName || '').split(' ').map(function (n) { return n[0]; }).join('');
      heroAvatarEl.style.backgroundImage = '';
    }
  }

  // Render dynamic stats in hero (replace static markup)
  const heroStats = document.querySelector('.hero__stats');
  if (heroStats && Array.isArray(P.stats)) {
    heroStats.innerHTML = P.stats.map(function (s) {
      return '<div class="stat reveal-up"><span class="stat__value" data-counter="' + s.value.replace('%','') + '" data-suffix="' + (s.value.indexOf('%') !== -1 ? '%' : '') + '">0</span><span class="stat__label">' + s.label + '</span></div>';
    }).join('');
    // observe and animate counters in the newly created stats
    const newCounters = heroStats.querySelectorAll('[data-counter]');
    if ('IntersectionObserver' in window && newCounters.length) {
      const newCounterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            newCounterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      newCounters.forEach(function (c) { newCounterObserver.observe(c); });
    } else {
      newCounters.forEach(function (c) { animateCounter(c); });
    }
  }

  // Update contact side links dynamically
  try {
    const contactSide = document.querySelector('.contact__side');
    if (contactSide) {
      const mail = contactSide.querySelector('a[href^="mailto:"]');
      const tel = contactSide.querySelector('a[href^="tel:"]');
      const li = contactSide.querySelector('a[href*="linkedin.com"]');
      const gh = contactSide.querySelector('a[href*="github.com"]');
      if (mail && P.email) {
        mail.href = 'mailto:' + P.email; mail.querySelector('span:last-child').textContent = P.email;
        const btn = mail.closest('.contact-chip').querySelector('.contact-chip__copy');
        if (btn) btn.setAttribute('data-copy', P.email);
      }
      if (tel && P.phone) {
        tel.href = 'tel:' + P.phone.replace(/\s+/g,''); tel.querySelector('span:last-child').textContent = P.phone;
        const btn = tel.closest('.contact-chip').querySelector('.contact-chip__copy');
        if (btn) btn.setAttribute('data-copy', P.phone);
      }
      if (li && P.linkedInUrl) {
        li.href = P.linkedInUrl; li.querySelector('span:last-child').textContent = P.linkedIn;
        const btn = li.closest('.contact-chip').querySelector('.contact-chip__copy');
        if (btn) btn.setAttribute('data-copy', P.linkedInUrl);
      }
      if (gh && P.gitHubUrl) {
        gh.href = P.gitHubUrl; gh.querySelector('span:last-child').textContent = P.gitHub;
        const btn = gh.closest('.contact-chip').querySelector('.contact-chip__copy');
        if (btn) btn.setAttribute('data-copy', P.gitHubUrl);
      }

      // Copy-to-clipboard for each contact chip.
      contactSide.querySelectorAll('.contact-chip__copy').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const value = btn.getAttribute('data-copy') || '';
          const done = function () {
            btn.classList.add('is-copied');
            btn.textContent = '✓';
            showToast('Copied to clipboard!', 'success');
            setTimeout(function () { btn.classList.remove('is-copied'); btn.textContent = '⧉'; }, 1600);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value).then(done).catch(function () { fallbackCopy(value, done); });
          } else {
            fallbackCopy(value, done);
          }
        });
      });
    }
  } catch (e) { /* ignore DOM errors */ }

  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) { /* ignore */ }
  }

  // showToast (defined later in this file, section 9c) is hoisted so it can
  // be safely referenced here even though it's declared further down.

  // Skills — radial mind-map visualization
  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid && P.skillGroups) {
    P.skillGroups.forEach(function (group, i) {
      const map = document.createElement('div');
      map.className = 'mindmap reveal-up';
      map.setAttribute('data-delay', String((i % 5) + 1));
      map.innerHTML =
        '<div class="mindmap__stage">' +
        '<svg class="mindmap__lines" aria-hidden="true"></svg>' +
        '<button type="button" class="mindmap__hub" aria-expanded="false">' +
        '<span class="mindmap__hub-pulse"></span>' +
        group.category +
        '<span class="mindmap__hub-count">' + group.items.length + '</span>' +
        '</button>' +
        '<div class="mindmap__nodes">' +
        group.items.map(function (item) { return '<span class="mindmap__node tag"><span class="mindmap__node-dot"></span>' + item + '</span>'; }).join('') +
        '</div>' +
        '</div>';

      const stage = map.querySelector('.mindmap__stage');
      const hub = map.querySelector('.mindmap__hub');
      const nodesWrap = map.querySelector('.mindmap__nodes');
      const nodes = Array.from(nodesWrap.querySelectorAll('.mindmap__node'));
      const svg = map.querySelector('.mindmap__lines');

      // Arrange nodes evenly around a circle centered on the stage, radius
      // scaled to fit the stage while keeping labels legible.
      function layoutNodes() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        const isMobile = window.matchMedia('(max-width: 720px)').matches;
        if (isMobile) {
          nodes.forEach(function (node) { node.style.left = ''; node.style.top = ''; });
          return;
        }
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) / 2 - 46;
        const count = nodes.length;
        nodes.forEach(function (node, idx) {
          const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          node.style.left = x + 'px';
          node.style.top = y + 'px';
        });
      }

      function drawLines() {
        if (window.matchMedia('(max-width: 720px)').matches) { svg.innerHTML = ''; return; }
        if (!map.classList.contains('is-open')) { svg.innerHTML = ''; return; }
        const stageRect = stage.getBoundingClientRect();
        const hubRect = hub.getBoundingClientRect();
        const startX = hubRect.left - stageRect.left + hubRect.width / 2;
        const startY = hubRect.top - stageRect.top + hubRect.height / 2;
        svg.innerHTML = nodes.map(function (node) {
          const r = node.getBoundingClientRect();
          const endX = r.left - stageRect.left + r.width / 2;
          const endY = r.top - stageRect.top + r.height / 2;
          const midX = startX + (endX - startX) * 0.5;
          const midY = startY + (endY - startY) * 0.5;
          return '<circle cx="' + endX + '" cy="' + endY + '" r="2.5"></circle>' +
            '<path d="M' + startX + ',' + startY + ' Q ' + midX + ',' + midY + ' ' + endX + ',' + endY + '"></path>';
        }).join('');
      }

      function redraw() {
        layoutNodes();
        requestAnimationFrame(drawLines);
      }

      hub.addEventListener('click', function () {
        const isOpen = map.classList.contains('is-open');
        map.classList.toggle('is-open', !isOpen);
        hub.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen) {
          redraw();
        } else {
          svg.innerHTML = '';
        }
      });

      window.addEventListener('resize', function () {
        if (map.classList.contains('is-open')) redraw();
      }, { passive: true });

      skillsGrid.appendChild(map);
      revealObserveIfNeeded(map);
      map.__redraw = redraw;
      layoutNodes();
    });
    // Open the first mind-map by default so the section isn't empty on load.
    const firstMap = skillsGrid.querySelector('.mindmap');
    if (firstMap) {
      firstMap.classList.add('is-open');
      const firstHub = firstMap.querySelector('.mindmap__hub');
      if (firstHub) firstHub.setAttribute('aria-expanded', 'true');
      setTimeout(function () { if (firstMap.__redraw) firstMap.__redraw(); }, 350);
    }
  }

  // Skills search
  const skillsSearch = document.getElementById('skillsSearch');
  if (skillsSearch && skillsGrid) {
    skillsSearch.addEventListener('input', function () {
      const query = skillsSearch.value.trim().toLowerCase();
      const maps = skillsGrid.querySelectorAll('.mindmap');
      maps.forEach(function (map) {
        const nodes = map.querySelectorAll('.mindmap__node');
        let hasMatch = !query;
        nodes.forEach(function (node) {
          const matches = query && node.textContent.toLowerCase().indexOf(query) !== -1;
          node.classList.toggle('is-highlighted', matches);
          if (matches) hasMatch = true;
        });
        map.classList.toggle('is-hidden', !hasMatch);
        const hub = map.querySelector('.mindmap__hub');
        if (query && hasMatch && !map.classList.contains('is-open')) {
          map.classList.add('is-open');
          if (hub) hub.setAttribute('aria-expanded', 'true');
          setTimeout(function () { if (map.__redraw) map.__redraw(); }, 60);
        }
      });
    });
  }

  // Experience timeline
  const timeline = document.getElementById('timeline');
  if (timeline && P.experience) {
    P.experience.forEach(function (exp, i) {
      const item = document.createElement('div');
      item.className = 'timeline-item reveal-up';
      item.setAttribute('data-delay', String((i % 5) + 1));
      item.innerHTML =
        '<span class="timeline-item__dot"></span>' +
        '<div class="timeline-item__card">' +
        '<p class="timeline-item__period">' + exp.period + '</p>' +
        '<h3 class="timeline-item__role">' + exp.role + '</h3>' +
        '<p class="timeline-item__company">' + exp.company + '</p>' +
        '<ul class="timeline-item__list">' +
        exp.achievements.map(function (a) { return '<li>' + a + '</li>'; }).join('') +
        '</ul></div>';
      timeline.appendChild(item);
      revealObserveIfNeeded(item);
    });
  }

  // Projects
  const projectsGrid = document.getElementById('projectsGrid');
  const projectsEmpty = document.getElementById('projectsEmpty');
  const projectsSearch = document.getElementById('projectsSearch');
  let allProjects = P.projects || [];
  let currentFilter = 'All';
  let currentSearch = '';

  // Subtle 3D tilt effect that follows the cursor for a more tactile,
  // "advanced" feel on pointer devices. No-op on touch/coarse pointers.
  function attachTiltEffect(card) {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (relY * -8).toFixed(2);
      const rotateY = (relX * 10).toFixed(2);
      card.style.transform = 'translateY(-10px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  }

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';
    const query = currentSearch.trim().toLowerCase();
    const filtered = allProjects.filter(function (p) {
      const matchesFilter = currentFilter === 'All' || p.category === currentFilter;
      const matchesQuery = !query ||
        p.title.toLowerCase().indexOf(query) !== -1 ||
        p.description.toLowerCase().indexOf(query) !== -1 ||
        p.tech.some(function (t) { return t.toLowerCase().indexOf(query) !== -1; });
      return matchesFilter && matchesQuery;
    });

    if (projectsEmpty) projectsEmpty.hidden = filtered.length !== 0;

    filtered.forEach(function (proj, i) {
      const card = document.createElement('div');
      card.className = 'project-card reveal-up is-visible';
      card.setAttribute('data-category', proj.category);
      card.innerHTML =
        '<span class="project-card__category">' + proj.category + '</span>' +
        '<h3 class="project-card__title">' + proj.title + '</h3>' +
        '<p class="project-card__desc">' + proj.description + '</p>' +
        '<div class="project-card__tech">' +
        proj.tech.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') +
        '</div>' +
        '<div class="project-card__footer">' +
        (proj.gitHubUrl ? '<a class="project-card__link" href="' + proj.gitHubUrl + '" target="_blank" rel="noopener">View Code ↗</a>' : '<span></span>') +
        '<button type="button" class="project-card__expand" aria-label="Expand details">→</button>' +
        '</div>';
      card.querySelector('.project-card__expand').addEventListener('click', function () { openModal(proj); });
      attachTiltEffect(card);
      projectsGrid.appendChild(card);
    });
  }
  renderProjects();

  const filterBar = document.getElementById('filterBar');
  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      currentFilter = btn.getAttribute('data-filter');
      renderProjects();
    });
  }

  if (projectsSearch) {
    let searchDebounce = null;
    projectsSearch.addEventListener('input', function () {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(function () {
        currentSearch = projectsSearch.value;
        renderProjects();
      }, 150);
    });
  }

  // Repos
  const reposGrid = document.getElementById('reposGrid');
  if (reposGrid && P.repositories) {
    P.repositories.forEach(function (repo, i) {
      const card = document.createElement('div');
      card.className = 'repo-card reveal-up';
      card.setAttribute('data-delay', String((i % 5) + 1));
      card.innerHTML =
        '<div class="repo-card__header">' +
        '<span class="repo-card__name">' + repo.name + '</span>' +
        '<span class="repo-card__stars">⭐ ' + repo.stars + '</span>' +
        '</div>' +
        '<p class="repo-card__desc">' + repo.description + '</p>' +
        '<div class="repo-card__tech">' +
        repo.tech.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') +
        '</div>';
      reposGrid.appendChild(card);
      revealObserveIfNeeded(card);
    });
  }

  // Certifications
  const certsGrid = document.getElementById('certsGrid');
  if (certsGrid && P.certifications) {
    P.certifications.forEach(function (cert, i) {
      const card = document.createElement('div');
      card.className = 'cert-card reveal-up';
      card.setAttribute('data-delay', String((i % 5) + 1));
      card.innerHTML =
        '<span class="cert-card__icon">🏆</span>' +
        '<div>' +
        '<h4 class="cert-card__title">' + cert.title + '</h4>' +
        '<p class="cert-card__meta">' + cert.issuer + ' · ' + cert.date + '</p>' +
        (cert.credentialId ? '<p class="cert-card__id">ID: ' + cert.credentialId + '</p>' : '') +
        '</div>';
      certsGrid.appendChild(card);
      revealObserveIfNeeded(card);
    });
  }

  // Accomplishments
  const accList = document.getElementById('accomplishmentsList');
  if (accList && P.accomplishments) {
    P.accomplishments.forEach(function (a) {
      const li = document.createElement('li');
      li.textContent = a;
      accList.appendChild(li);
    });
  }

  // Testimonials carousel
  const testimonialTrack = document.getElementById('testimonialTrack');
  const carouselDots = document.getElementById('carouselDots');
  if (testimonialTrack && P.testimonials && P.testimonials.length) {
    P.testimonials.forEach(function (t) {
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide';
      slide.innerHTML =
        '<p class="testimonial-slide__quote">' + t.quote + '</p>' +
        '<p class="testimonial-slide__author">— ' + t.author + '</p>';
      testimonialTrack.appendChild(slide);

      const dot = document.createElement('span');
      dot.className = 'carousel-dot';
      carouselDots.appendChild(dot);
    });

    let current = 0;
    const dots = Array.from(carouselDots.children);
    function showSlide(i) {
      current = i;
      testimonialTrack.style.transform = 'translateX(-' + (i * 100) + '%)';
      dots.forEach(function (d, idx) { d.classList.toggle('is-active', idx === i); });
    }
    showSlide(0);
    dots.forEach(function (d, i) { d.addEventListener('click', function () { showSlide(i); }); });
    if (P.testimonials.length > 1) {
      setInterval(function () { showSlide((current + 1) % P.testimonials.length); }, 5000);
    }
  }

  function revealObserveIfNeeded(el) {
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(el);
    } else {
      el.classList.add('is-visible');
    }
  }

  /* ---------------------------------------------------------------------
     9. Project modal
  --------------------------------------------------------------------- */
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalLinks = document.getElementById('modalLinks');

  function openModal(proj) {
    if (!modal) return;
    modalCategory.textContent = proj.category;
    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.description;
    modalTech.innerHTML = proj.tech.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    modalFeatures.innerHTML = (proj.features || []).map(function (f) { return '<li>' + f + '</li>'; }).join('');
    modalLinks.innerHTML = '';
    if (proj.gitHubUrl) {
      const a = document.createElement('a');
      a.href = proj.gitHubUrl; a.target = '_blank'; a.rel = 'noopener';
      a.className = 'btn btn--ghost'; a.innerHTML = '<span>View Code</span>';
      modalLinks.appendChild(a);
    }
    if (proj.liveUrl) {
      const a2 = document.createElement('a');
      a2.href = proj.liveUrl; a2.target = '_blank'; a2.rel = 'noopener';
      a2.className = 'btn btn--primary'; a2.innerHTML = '<span>Live Demo</span>';
      modalLinks.appendChild(a2);
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------------------------------------------------------------------
     9b. Profile edit modal wiring
  --------------------------------------------------------------------- */
  const profileModal = document.getElementById('profileModal');
  const profileModalClose = document.getElementById('profileModalClose');
  const profileEditBtn = document.getElementById('profileEditBtn');
  const profileName = document.getElementById('profileName');
  const profileTitle = document.getElementById('profileTitle');
  const profileRoles = document.getElementById('profileRoles');
  const profileLocation = document.getElementById('profileLocation');
  const profileEmail = document.getElementById('profileEmail');
  const profilePhone = document.getElementById('profilePhone');
  const profileAvatarInput = document.getElementById('profileAvatarInput');
  const profileAvatarPreview = document.getElementById('profileAvatarPreview');
  const profileCancel = document.getElementById('profileCancel');
  const profileSave = document.getElementById('profileSave');
  const profileReset = document.getElementById('profileReset');

  function openProfileModal() {
    if (!profileModal) return;
    profileName.value = P.fullName || '';
    profileTitle.value = P.title || '';
    profileRoles.value = (P.roles || []).join(', ');
    profileLocation.value = P.location || '';
    profileEmail.value = P.email || '';
    profilePhone.value = P.phone || '';
    profileAvatarPreview.innerHTML = '';
    if (P.avatar || P.photoUrl) {
      const img = document.createElement('img'); img.src = P.avatar || P.photoUrl; img.style.maxWidth='100%'; img.style.borderRadius='8px';
      profileAvatarPreview.appendChild(img);
    } else {
      profileAvatarPreview.textContent = 'Preview';
    }
    profileModal.classList.add('is-open');
    profileModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeProfileModal() {
    if (!profileModal) return;
    profileModal.classList.remove('is-open');
    profileModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  if (profileEditBtn) profileEditBtn.addEventListener('click', openProfileModal);
  if (profileModalClose) profileModalClose.addEventListener('click', closeProfileModal);
  if (profileCancel) profileCancel.addEventListener('click', closeProfileModal);

  // Reset any saved profile override (fixes stale/broken avatar or data
  // persisted in localStorage from a previous edit) and restore the
  // original values from data.js.
  if (profileReset) {
    profileReset.addEventListener('click', function () {
      try { localStorage.removeItem('advportfolio-profile-override'); } catch (e) { /* ignore */ }
      window.location.reload();
    });
  }

  // Avatar file preview and read as data URL
  if (profileAvatarInput) {
    profileAvatarInput.addEventListener('change', function (e) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = function (ev) {
        profileAvatarPreview.innerHTML = '';
        const img = document.createElement('img'); img.src = ev.target.result; img.style.maxWidth='100%'; img.style.borderRadius='8px';
        profileAvatarPreview.appendChild(img);
        profileAvatarPreview.dataset.dataurl = ev.target.result;
      };
      reader.readAsDataURL(f);
    });
  }

  if (profileSave) {
    profileSave.addEventListener('click', function () {
      const updated = {
        fullName: profileName.value.trim(),
        title: profileTitle.value.trim(),
        roles: profileRoles.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean),
        location: profileLocation.value.trim(),
        email: profileEmail.value.trim(),
        phone: profilePhone.value.trim()
      };
      if (profileAvatarPreview.dataset.dataurl) updated.avatar = profileAvatarPreview.dataset.dataurl;
      try { localStorage.setItem('advportfolio-profile-override', JSON.stringify(updated)); } catch (e) { /* ignore */ }
      // apply immediately and reload relevant UI
      Object.assign(P, updated);
      if (typedNameEl) typedNameEl.textContent = P.fullName || '';
      if (heroDescEl && P.summary) heroDescEl.textContent = P.summary;
      if (heroAvatarEl) {
        if (P.avatar) {
          heroAvatarEl.style.backgroundImage = 'url(' + P.avatar + ')'; heroAvatarEl.textContent = ''; heroAvatarEl.style.backgroundSize='cover';
        }
      }
      closeProfileModal();
    });
  }

  /* ---------------------------------------------------------------------
     10. Contact form
     Sends via mailto: fallback by default (zero backend, zero third-party
     dependency, works everywhere instantly). To use a real automatic email
     API instead, set CONTACT_ENDPOINT below to your own provider's endpoint
     (e.g. a Web3Forms access-key URL) and it will be used automatically.
  --------------------------------------------------------------------- */
  const RECEIVER_EMAIL = (P.email || 'uppuluti.akshay@gmail.com');
  // Automatically emails every submission's name, email, subject, and message
  // to RECEIVER_EMAIL using FormSubmit's free AJAX endpoint — no backend,
  // no API key required. The first submission after deploying will trigger a
  // one-time "activation" email from FormSubmit to RECEIVER_EMAIL; click the
  // confirmation link there once and all future submissions are delivered
  // automatically. Leave CONTACT_ENDPOINT empty to fall back to mailto: instead.
  const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/' + encodeURIComponent(RECEIVER_EMAIL);

  /* ---------------------------------------------------------------------
     9c. Toast notifications
  --------------------------------------------------------------------- */
  const toastStack = document.getElementById('toastStack');
  function showToast(message, type) {
    if (!toastStack) return;
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' toast--' + type : '');
    const icon = type === 'error' ? '!' : type === 'success' ? '\u2713' : '\u2139';
    toast.innerHTML = '<span class="toast__icon">' + icon + '</span><span class="toast__text">' + message + '</span>';
    toastStack.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('is-visible'); });
    setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.remove(); }, 400);
    }, 4200);
  }

  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitLabel = document.getElementById('submitLabel');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('#cf-name').value.trim();
      const email = form.querySelector('#cf-email').value.trim();
      const subject = form.querySelector('#cf-subject').value.trim();
      const message = form.querySelector('#cf-message').value.trim();
      const website = form.querySelector('#cf-website').value.trim();

      formStatus.classList.remove('is-error', 'is-success');

      if (!name || !email || !subject || !message) {
        formStatus.classList.add('is-error');
        formStatus.textContent = 'Please fill in all fields before sending.';
        showToast('Please fill in all fields before sending.', 'error');
        return;
      }
      if (website) {
        // Honeypot triggered — silently no-op as if successful.
        formStatus.classList.add('is-success');
        formStatus.textContent = 'Thanks! Your message has been sent.';
        showToast('Thanks! Your message has been sent.', 'success');
        form.reset();
        return;
      }

      if (CONTACT_ENDPOINT) {
        sendViaApi(name, email, subject, message);
      } else {
        sendViaMailto(name, email, subject, message);
      }
    });
  }

  function sendViaMailto(name, email, subject, message) {
    const body =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      message;
    const mailtoUrl =
      'mailto:' + encodeURIComponent(RECEIVER_EMAIL) +
      '?subject=' + encodeURIComponent('Portfolio contact: ' + subject) +
      '&body=' + encodeURIComponent(body);

    formStatus.classList.add('is-success');
    formStatus.textContent = 'Opening your email client to send this to ' + RECEIVER_EMAIL + '…';
    showToast('Opening your email client…', 'success');
    window.location.href = mailtoUrl;

    setTimeout(function () {
      formStatus.textContent = 'Thanks, ' + name + '! Please hit "Send" in your email app to deliver your message.';
    }, 900);
  }

  function sendViaApi(name, email, subject, message) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    formStatus.textContent = 'Sending your message…';

    fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: 'Portfolio contact: ' + subject,
        message: message,
        _replyto: email,
        _subject: 'Portfolio contact: ' + subject,
        _template: 'table',
        _captcha: 'false'
      })
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (result) {
        if (result.ok) {
          formStatus.classList.add('is-success');
          formStatus.textContent = 'Thanks, ' + name + '! Your message has been sent successfully.';
          showToast('Message sent successfully!', 'success');
          form.reset();
        } else {
          formStatus.classList.add('is-error');
          formStatus.textContent = (result.data && result.data.message) || 'Something went wrong. Please try again.';
          showToast('Something went wrong. Please try again.', 'error');
        }
      })
      .catch(function () {
        formStatus.classList.add('is-error');
        formStatus.textContent = 'Network error. Falling back to your email client…';
        sendViaMailto(name, email, subject, message);
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  }

  /* ---------------------------------------------------------------------
     11. Misc
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
