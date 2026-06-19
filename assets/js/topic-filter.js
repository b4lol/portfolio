document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.topic-btn');
  const articles = document.querySelectorAll('.posts-grid article');
  const filtersContainer = document.querySelector('.topic-filters');
  if (!filtersContainer) return;

  // Create sliding highlight element
  var slider = document.createElement('div');
  slider.className = 'topic-slider';
  filtersContainer.appendChild(slider);

  function moveSlider(btn) {
    var rect = btn.getBoundingClientRect();
    var parentRect = filtersContainer.getBoundingClientRect();
    slider.style.left = (rect.left - parentRect.left) + 'px';
    slider.style.top = (rect.top - parentRect.top) + 'px';
    slider.style.width = rect.width + 'px';
    slider.style.height = rect.height + 'px';
  }

  // Initialize slider on the active button
  var activeBtn = filtersContainer.querySelector('.topic-btn.active');
  if (activeBtn) moveSlider(activeBtn);

  // Reposition on resize
  window.addEventListener('resize', function() {
    var current = filtersContainer.querySelector('.topic-btn.active');
    if (current) moveSlider(current);
  });

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      buttons.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      moveSlider(btn);

      var topic = btn.getAttribute('data-topic');

      // Fade out all visible articles
      articles.forEach(function(article) {
        if (article.style.display !== 'none') {
          article.classList.add('fade-out');
          article.classList.remove('fade-in');
        }
      });

      // After fade-out, toggle visibility and fade in
      setTimeout(function() {
        articles.forEach(function(article) {
          var shouldShow = topic === 'all' ||
            (article.getAttribute('data-topics') || '').split(' ').indexOf(topic) !== -1;

          if (shouldShow) {
            article.style.display = '';
            article.offsetHeight;
            article.classList.remove('fade-out');
            article.classList.add('fade-in');
          } else {
            article.style.display = 'none';
            article.classList.remove('fade-out', 'fade-in');
          }
        });
      }, 150);
    });
  });
});
