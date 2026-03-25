import './src/styles/global.css'
import './src/styles/lazyLoading.css'
import 'slick-carousel/slick/slick.css'

export const onClientEntry = () => {
  if (typeof window === 'undefined') return;

  const shouldDisableServiceWorker = !['beseen.moonglade.life', 'www.beseen.moonglade.life'].includes(window.location.hostname);

  // ── 1. Unregister stale service workers from preview/old domains ──────────
  // Users who visited beseen-moonglade-text.netlify.app may still have that
  // SW cached. Unregister any SW whose scriptURL doesn't match the current origin.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => {
        const swOrigin = reg.active?.scriptURL || reg.installing?.scriptURL || reg.waiting?.scriptURL || '';
        if (shouldDisableServiceWorker || (swOrigin && !swOrigin.startsWith(window.location.origin))) {
          reg.unregister();
        }
      });
    });
  }

  if (shouldDisableServiceWorker && 'caches' in window) {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
  }

  // ── 2. Suppress noisy third-party widget console output ───────────────────
  // The WhatsApp/CRM integration-plugin.js and widget-plugin-dev.js log
  // verbose internal state (BTN linkId, before/after Objects, Loaded script).
  // These are harmless but pollute the console — filter them out.
  const SUPPRESSED = ['integration-plugin', 'widget-plugin', 'Loaded script', 'installingWorker'];
  const _log = console.log.bind(console);
  const _warn = console.warn.bind(console);
  console.log = (...args) => {
    const str = args.map(String).join(' ');
    if (SUPPRESSED.some((s) => str.includes(s))) return;
    _log(...args);
  };
  console.warn = (...args) => {
    const str = args.map(String).join(' ');
    if (SUPPRESSED.some((s) => str.includes(s))) return;
    _warn(...args);
  };

  // ── 3. Load Cloudflare Turnstile script once globally ────────────────────
  // In development, Turnstile uses Cloudflare's official test key (configured in
  // src/config/turnstileConfig.ts) so the widget renders without 401 errors on localhost.
  const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  if (!document.querySelector(`script[src^="https://challenges.cloudflare.com/turnstile"]`)) {
    const script = document.createElement('script');
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
};