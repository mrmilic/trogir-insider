// Trogir Insider — shared site behaviour

/* ============================================================
   Google Consent Mode v2 + GA4 + affiliate-click tracking
   ------------------------------------------------------------
   Default: ALL consent denied (no analytics cookie is written;
   GA sends only cookieless pings until the user accepts).
   The cookie banner (below) flips analytics_storage to granted.
   Custom affiliate_click events fire only after consent.
   ============================================================ */
(function () {
  var GA_ID    = 'G-X1H6ZZLQPE';
  var STORE_KEY = 'ti_consent';            // stored value: 'granted' | 'denied'

  var stored = null;
  try { stored = localStorage.getItem(STORE_KEY); } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // 1) Consent defaults — set BEFORE config, everything denied
  gtag('consent', 'default', {
    ad_storage:         'denied',
    ad_user_data:       'denied',
    ad_personalization: 'denied',
    analytics_storage:  'denied',
    wait_for_update:    500
  });

  // 2) Re-apply a previously saved choice
  if (stored === 'granted') {
    gtag('consent', 'update', {
      ad_storage:         'granted',
      ad_user_data:       'granted',
      ad_personalization: 'granted',
      analytics_storage:  'granted'
    });
  }
  window.__tiConsent = (stored === 'granted');   // gate for custom events

  // 3) Initialise GA (honours the consent state set above)
  gtag('js', new Date());
  gtag('config', GA_ID);

  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(ga);

  // Called by the banner buttons
  window.__tiSetConsent = function (granted) {
    try { localStorage.setItem(STORE_KEY, granted ? 'granted' : 'denied'); } catch (e) {}
    window.__tiConsent = granted;
    gtag('consent', 'update', {
      ad_storage:         granted ? 'granted' : 'denied',
      ad_user_data:       granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
      analytics_storage:  granted ? 'granted' : 'denied'
    });
  };

  function providerFor(href) {
    if (/\/go\/booking/i.test(href))  return 'booking';
    if (/booking\.com/i.test(href))   return 'booking';
    if (/getyourguide\./i.test(href)) return 'getyourguide';
    if (/viator\./i.test(href))       return 'viator';
    if (/discovercars\./i.test(href)) return 'discovercars';
    return 'other';
  }

  // Affiliate-click tracking — blocked until analytics consent is granted
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[rel~="sponsored"]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (!window.__tiConsent) return;          // consent gate
        gtag('event', 'affiliate_click', {
          provider:  providerFor(a.href),
          link_url:  a.href,
          link_text: (a.textContent || '').trim().slice(0, 100),
          page_path: location.pathname
        });
      });
    });
  });

  // On-site funnel tracking — internal CTAs + contact (consent-gated).
  // Delegated so it also covers anything added later; affiliate links are
  // skipped here because they already fire affiliate_click above.
  document.addEventListener('click', function (e) {
    if (!window.__tiConsent) return;              // consent gate
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.matches('[rel~="sponsored"]')) return;
    var href = a.getAttribute('href') || '';
    if (/^mailto:/i.test(href)) {
      gtag('event', 'contact_click', { method: 'email', page_path: location.pathname });
    } else if (a.matches('.link-arrow, .index-row, .tcard-link')) {
      gtag('event', 'cta_click', {
        cta_text:  (a.textContent || '').trim().slice(0, 80),
        link_url:  href,
        page_path: location.pathname
      });
    }
  }, true);
})();

/* ---------- Cookie banner + navigation ---------- */
document.addEventListener('DOMContentLoaded', function () {

  // Cookie consent banner — shown once, only if no choice stored yet
  var choice = null;
  try { choice = localStorage.getItem('ti_consent'); } catch (e) {}
  if (!choice) {
    var bar = document.createElement('div');
    bar.className = 'cc-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<p class="cc-text">We use cookies for analytics (Google Analytics) to understand how this guide is used. ' +
      'Accept to help us improve, or decline — affiliate and analytics tracking stays off. ' +
      'See our <a href="datenschutz.html">Privacy</a> page.</p>' +
      '<div class="cc-actions">' +
        '<button type="button" class="cc-btn cc-decline">Decline</button>' +
        '<button type="button" class="cc-btn cc-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);

    function close(granted) {
      if (window.__tiSetConsent) window.__tiSetConsent(granted);
      bar.parentNode && bar.parentNode.removeChild(bar);
    }
    bar.querySelector('.cc-accept').addEventListener('click', function () { close(true); });
    bar.querySelector('.cc-decline').addEventListener('click', function () { close(false); });
  }

  // Mobile nav toggle
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
