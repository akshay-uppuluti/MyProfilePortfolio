/* ==========================================================================
   Insights page — renders article cards from PROFILE.insights (data.js)
   ========================================================================== */

(function () {
  "use strict";

  const P = window.PROFILE || {};
  const grid = document.getElementById('insightsGrid');
  const filterBar = document.getElementById('insightsFilterBar');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!grid) return;

  const insights = P.insights || [];
  const categories = Array.from(new Set(insights.map(function (i) { return i.category; })));

  if (filterBar) {
    categories.forEach(function (cat) {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.setAttribute('data-filter', cat);
      btn.textContent = cat;
      filterBar.appendChild(btn);
    });

    filterBar.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      render(btn.getAttribute('data-filter'));
    });
  }

  function observeReveal(el) {
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

  function render(filter) {
    grid.innerHTML = '';
    const filtered = (!filter || filter === 'All') ? insights : insights.filter(function (i) { return i.category === filter; });
    filtered.forEach(function (item, i) {
      const card = document.createElement('article');
      card.className = 'article-card reveal-up';
      card.setAttribute('data-delay', String((i % 5) + 1));
      card.innerHTML =
        '<span class="article-card__category">' + item.category + '</span>' +
        '<h3 class="article-card__title">' + item.title + '</h3>' +
        '<p class="article-card__meta">' + item.date + ' · ' + item.readTime + '</p>' +
        '<p class="article-card__summary">' + item.summary + '</p>' +
        '<div class="article-card__tags">' +
        (item.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') +
        '</div>';
      grid.appendChild(card);
      observeReveal(card);
    });
  }

  render('All');
})();
