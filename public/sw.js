/* ============================================================
   SERVICE WORKER – Dindeya Development & Support Organization
   ============================================================ */

const CACHE_VERSION = 'v3-redesign';
const CACHE_NAME = `dindeya-${CACHE_VERSION}`;
const RUNTIME_CACHE = `dindeya-runtime-${CACHE_VERSION}`;

/* Pre-cache only static, non-hashed URLs (relative to SW scope) */
const STATIC_ASSETS = [
  './',
  './index.html',
  './projects.html',
  './team.html',
  './contact.html',
  './membership.html',
  './about.html',
  './donate.html',
  './updates.html',
  './fr.html',
  './manifest.json',
];

/* ── Install: pre-cache shell pages ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: remove old caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== RUNTIME_CACHE) {
            return caches.delete(key);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch: network-first for HTML, cache-first for assets ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin) return;
  if (request.headers.has('range') || url.pathname.startsWith('/assets/video/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((r) => r || caches.match('./index.html'))
        )
    );
    return;
  }

  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone));
          }
          return response;
        }).catch(() => {
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="#e5e7eb" width="400" height="300"/><text x="50%" y="50%" font-size="18" fill="#9ca3af" text-anchor="middle" dy=".3em">Unavailable offline</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
