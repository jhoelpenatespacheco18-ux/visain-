/* Service worker · modo sin internet.
 * Estrategia: precache de TODA la app al instalar + "caché primero, red de respaldo".
 * La lista PRECACHE se regenera con:  node scripts/update-precache.mjs
 * IMPORTANTE: al cambiar cualquier archivo, ejecutar ese script (sube VERSION) y volver a publicar.
 */
const VERSION = '71bd3a830d';
const CACHE = 'visain-' + VERSION;
/* @generated:start */
const PRECACHE = [
  "./",
  "./assets/backgrounds/lamina-01.jpg",
  "./assets/backgrounds/lamina-02.jpg",
  "./assets/backgrounds/lamina-03.jpg",
  "./assets/backgrounds/lamina-04.jpg",
  "./assets/backgrounds/lamina-05.jpg",
  "./assets/backgrounds/lamina-06.jpg",
  "./assets/backgrounds/lamina-07.jpg",
  "./assets/backgrounds/lamina-08.jpg",
  "./assets/backgrounds/lamina-09.jpg",
  "./assets/backgrounds/lamina-10.jpg",
  "./assets/backgrounds/lamina-11.jpg",
  "./assets/backgrounds/lamina-12.jpg",
  "./assets/backgrounds/lamina-13.jpg",
  "./assets/backgrounds/lamina-14.jpg",
  "./assets/backgrounds/lamina-15.jpg",
  "./assets/backgrounds/thumbs/lamina-01.jpg",
  "./assets/backgrounds/thumbs/lamina-02.jpg",
  "./assets/backgrounds/thumbs/lamina-03.jpg",
  "./assets/backgrounds/thumbs/lamina-04.jpg",
  "./assets/backgrounds/thumbs/lamina-05.jpg",
  "./assets/backgrounds/thumbs/lamina-06.jpg",
  "./assets/backgrounds/thumbs/lamina-07.jpg",
  "./assets/backgrounds/thumbs/lamina-08.jpg",
  "./assets/backgrounds/thumbs/lamina-09.jpg",
  "./assets/backgrounds/thumbs/lamina-10.jpg",
  "./assets/backgrounds/thumbs/lamina-11.jpg",
  "./assets/backgrounds/thumbs/lamina-12.jpg",
  "./assets/backgrounds/thumbs/lamina-13.jpg",
  "./assets/backgrounds/thumbs/lamina-14.jpg",
  "./assets/backgrounds/thumbs/lamina-15.jpg",
  "./assets/fonts/dm-sans-400.woff2",
  "./assets/fonts/dm-sans-500.woff2",
  "./assets/fonts/dm-sans-700.woff2",
  "./assets/fonts/rubik-500.woff2",
  "./assets/fonts/rubik-600.woff2",
  "./assets/fonts/rubik-700.woff2",
  "./assets/fonts/rubik-800.woff2",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/maskable-512.png",
  "./assets/img/logo.png",
  "./assets/img/seal-center.png",
  "./assets/img/seal-ring.png",
  "./assets/slides/aliado.jpg",
  "./assets/slides/ayudando.jpg",
  "./assets/slides/bags.jpg",
  "./assets/slides/box.jpg",
  "./assets/slides/campana.jpg",
  "./assets/slides/cierre.jpg",
  "./assets/slides/cover.jpg",
  "./assets/slides/directa.jpg",
  "./assets/slides/igual.jpg",
  "./assets/slides/impulso.jpg",
  "./assets/slides/rangos.jpg",
  "./assets/slides/residual.jpg",
  "./css/fonts.css",
  "./css/hub.css",
  "./index.html",
  "./js/hub.js",
  "./js/register-sw.js",
  "./manifest.webmanifest",
  "./modules/plan-slides/css/plan.css",
  "./modules/plan-slides/index.html",
  "./modules/plan-slides/",
  "./modules/plan-slides/js/plan.js",
  "./modules/seminar/css/seminar.css",
  "./modules/seminar/css/tools.css",
  "./modules/seminar/index.html",
  "./modules/seminar/",
  "./modules/seminar/js/presentation.js",
  "./modules/seminar/js/tools.js",
  "./modules/simulator/css/simulator.css",
  "./modules/simulator/index.html",
  "./modules/simulator/",
  "./modules/simulator/js/simulator.js",
  "./modules/timer/css/timer.css",
  "./modules/timer/index.html",
  "./modules/timer/",
  "./modules/timer/js/backgrounds.js",
  "./modules/timer/js/controls.js",
  "./modules/timer/js/core.js",
  "./modules/timer/js/effects.js",
  "./modules/timer/js/questions.js",
  "./modules/timer/js/wheel.js"
];
/* @generated:end */

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('visain-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;           /* solo recursos propios */
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => (req.mode === 'navigate' ? caches.match(new URL('./index.html', self.registration.scope).href) : Response.error()));
    })
  );
});

self.addEventListener('message', (event) => { if (event.data === 'skipWaiting') self.skipWaiting(); });
