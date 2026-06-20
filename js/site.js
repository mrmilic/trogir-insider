// Trogir Insider — shared site behaviour

/* ============================================================
   Google Analytics 4 + affiliate-click conversion tracking
   Loaded sitewide (this file is included on every page).
   NOTE: For EU/DSGVO compliance this should run behind a
   consent banner (Google Consent Mode v2). See docs.
   ============================================================ */
(function () {
  var GA_ID = 'G-X1H6ZZLQPE';

  // Load gtag.js
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);

  // Map an affiliate URL to a provider name
  function providerFor(href) {
    if (/\/go\/booking/i.test(href))     return 'booking';
    if (/booking\.com/i.test(href))      return 'booking';
    if (/getyourguide\./i.test(href))    return 'getyourguide';
    if (/viator\./i.test(href))          return 'viator';
    if (/discovercars\./i.test(href))    return 'discovercars';
    return 'other';
  }

  // Track clicks on affiliate links (all carry rel="sponsored")
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[rel~="sponsored"]').forEach(function (a) {
      a.addEventListener('click', function () {
        gtag('event', 'affiliate_click', {
          provider:  providerFor(a.href),
          link_url:  a.href,
          link_text: (a.textContent || '').trim().slice(0, 100),
          page_path: location.pathname
        });
      });
    });
  });
})();

/* ---------- Navigation behaviour ---------- */
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
