const CACHE_NAME = "impostor-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/site.webmanifest",
  "/sw-register.js",
  "/android-chrome-72x72.png",
  "/android-chrome-96x96.png",
  "/android-chrome-128x128.png",
  "/android-chrome-192x192.png",
  "/android-chrome-256x256.png",
  "/android-chrome-384x384.png",
  "/android-chrome-512x512.png",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).catch(()=>caches.match('/index.html')))
  );
});
