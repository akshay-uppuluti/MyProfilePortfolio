/* ==========================================================================
   Command Palette (Ctrl/Cmd+K) — jump to sections, projects, and actions.
   Pure vanilla JS, no build step required.
   ========================================================================== */

(function () {
  "use strict";

  const overlay = document.getElementById('cmdkOverlay');
  const input = document.getElementById('cmdkInput');
  const list = document.getElementById('cmdkList');
  const trigger = document.getElementById('cmdkTrigger');
  if (!overlay || !input || !list) return;

  const P = window.PROFILE || {};

  function buildCommands() {
    const commands = [];

    document.querySelectorAll('.nav__link[data-nav]').forEach(function (link) {
      commands.push({
        icon: '#',
        label: link.textContent.trim(),
        sub: 'Section',
        action: function () { navigateTo(link.getAttribute('href')); }
      });
    });

    commands.push({
      icon: '??',
      label: 'Insights & Articles',
      sub: 'Page',
      action: function () { window.location.href = 'insights.html'; }
    });

    (P.projects || []).forEach(function (proj) {
      commands.push({
        icon: '???',
        label: proj.title,
        sub: proj.category + ' Project',
        action: function () { navigateTo('#projects'); }
      });
    });

    commands.push({
      icon: '??',
      label: 'Toggle theme',
      sub: 'Action',
      action: function () { document.getElementById('themeToggle') && document.getElementById('themeToggle').click(); }
    });
    commands.push({
      icon: '??',
      label: 'Download resume',
      sub: 'Action',
      action: function () {
        const link = document.querySelector('.hero__cta a[download]');
        if (link) link.click();
      }
    });
    commands.push({
      icon: '??',
      label: 'Contact me',
      sub: 'Action',
      action: function () { navigateTo('#contact'); }
    });
    commands.push({
      icon: '?',
      label: 'Show keyboard shortcuts',
      sub: 'Action',
      action: function () { document.getElementById('shortcutsBtn') && document.getElementById('shortcutsBtn').click(); }
    });

    return commands;
  }

  function navigateTo(hash) {
    if (window.location.pathname.indexOf('insights.html') !== -1 && hash.indexOf('#') === 0) {
      window.location.href = 'index.html' + hash;
      return;
    }
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  let allCommands = [];
  let filtered = [];
  let selectedIndex = 0;

  function render() {
    list.innerHTML = '';
    if (!filtered.length) {
      list.innerHTML = '<li class="cmdk__empty">No results found</li>';
      return;
    }
    filtered.forEach(function (cmd, i) {
      const li = document.createElement('li');
      li.className = 'cmdk__item' + (i === selectedIndex ? ' is-selected' : '');
      li.innerHTML =
        '<span class="cmdk__item-icon">' + cmd.icon + '</span>' +
        '<span class="cmdk__item-label">' + cmd.label + '</span>' +
        '<span class="cmdk__item-sub">' + cmd.sub + '</span>';
      li.addEventListener('click', function () { runCommand(cmd); });
      list.appendChild(li);
    });
  }

  function runCommand(cmd) {
    close();
    setTimeout(function () { cmd.action(); }, 150);
  }

  function filterCommands(query) {
    const q = query.trim().toLowerCase();
    filtered = !q ? allCommands : allCommands.filter(function (c) {
      return c.label.toLowerCase().indexOf(q) !== -1 || c.sub.toLowerCase().indexOf(q) !== -1;
    });
    selectedIndex = 0;
    render();
  }

  function open() {
    allCommands = buildCommands();
    filtered = allCommands;
    selectedIndex = 0;
    input.value = '';
    render();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { input.focus(); }, 60);
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (trigger) trigger.addEventListener('click', open);

  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

  input.addEventListener('input', function () { filterCommands(input.value); });

  document.addEventListener('keydown', function (e) {
    const isMod = e.ctrlKey || e.metaKey;
    if (isMod && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (overlay.classList.contains('is-open')) { close(); } else { open(); }
      return;
    }
    if (!overlay.classList.contains('is-open')) return;

    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
      render();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      render();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) runCommand(filtered[selectedIndex]);
    }
  });
})();
