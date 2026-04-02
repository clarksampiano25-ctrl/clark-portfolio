const filterButtons = document.querySelectorAll('.filter-btn');
const timelineCards = document.querySelectorAll('.timeline-card');
const countItems = document.querySelectorAll('[data-count]');
const themeToggle = document.getElementById('themeToggle');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    timelineCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
        return;
      }
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('hidden', !categories.includes(filter));
    });
  });
});

const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();

  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(update);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countItems.forEach(animateCount);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

if (countItems.length) {
  statsObserver.observe(countItems[0]);
}

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
