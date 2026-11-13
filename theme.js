'use strict';

(() => {
  const root = document.documentElement;
  const storageKey = 'joicy-portfolio-theme';
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let selected;
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark' || saved === 'light') selected = saved;
  } catch {
    
  }

  if (selected) root.dataset.theme = selected;

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    const themeColors = [...document.querySelectorAll('meta[name="theme-color"]')];

    function refresh() {
      const dark = selected ? selected === 'dark' : preference.matches;
      button.setAttribute('aria-pressed', String(dark));
      for (const meta of themeColors) meta.content = dark ? '#101e36' : '#f7f9fe';
    }

    button.addEventListener('click', () => {
      selected = button.getAttribute('aria-pressed') === 'true' ? 'light' : 'dark';
      root.dataset.theme = selected;
      try {
        localStorage.setItem(storageKey, selected);
      } catch {
        
      }
      refresh();
    });

    preference.addEventListener('change', refresh);
    refresh();
    button.hidden = false;
  });
})();
