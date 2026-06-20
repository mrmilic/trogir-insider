// Trogir Insider — shared nav behaviour
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }
  var nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('solid')) {
    var trigger = window.innerHeight * 0.8;
    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > trigger); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
