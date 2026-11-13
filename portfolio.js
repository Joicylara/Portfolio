'use strict';

const filters = document.querySelector('.filters');
const buttons = [...filters.querySelectorAll('button')];
const cards = [...document.querySelectorAll('.project')];
const status = document.querySelector('#filter-status');
let active = 'all';

function showProjects(filter) {
  active = filter;
  let count = 0;
  for (const card of cards) {
    card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
    if (!card.hidden) count++;
  }
  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === active));
  }
  status.textContent = count === 1 ? '1 projeto exibido.' : count + ' projetos exibidos.';
}

function revealProject(hash) {
  const card = cards.find(project => '#' + project.id === hash);
  if (card?.hidden) showProjects('all');
  return card;
}

filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (button && button.dataset.filter !== active) showProjects(button.dataset.filter);
});

document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link) revealProject(link.hash);
});

window.addEventListener('hashchange', () => {
  const card = cards.find(project => '#' + project.id === location.hash);
  if (card?.hidden) {
    revealProject(location.hash);
    card.scrollIntoView();
  }
});

const portrait = document.querySelector('.portrait');
if (portrait) {
  const front = portrait.querySelector('.portrait-front');
  const back = portrait.querySelector('.portrait-back');
  const avatar = back.querySelector('img');

  function showAvatar(visible) {
    portrait.classList.toggle('is-flipped', visible);
    front.setAttribute('aria-hidden', String(visible));
    back.setAttribute('aria-hidden', String(!visible));
  }

  avatar.src = avatar.dataset.src;
  const intro = new Promise(resolve => window.setTimeout(resolve, 1400));
  Promise.all([intro, avatar.decode()]).then(() => {
    showAvatar(true);
    portrait.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') showAvatar(false);
    });
    portrait.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') showAvatar(true);
    });
  }).catch(() => {
    
    avatar.removeAttribute('src');
  });
}
