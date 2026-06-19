// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var ul = btn.closest('nav').querySelector('ul');
      ul.classList.toggle('open');
    });
  });

  // close mobile menu when a link is clicked
  document.querySelectorAll('nav ul a').forEach(function (link) {
    link.addEventListener('click', function () {
      var ul = link.closest('ul');
      if (ul) ul.classList.remove('open');
    });
  });
});
