// Service Worker: speichert die App für die Offline-Nutzung.
// Bei Änderungen an Dateien CACHE_VERSION erhöhen, damit Nutzer die neue Version bekommen.
const CACHE_VERSION = 'v1';
const CACHE = `shk-azubi-${CACHE_VERSION}`;
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/styles.css',
  'js/app.js',
  'js/calc.js',
  'js/learn.js',
  'js/reference-view.js',
  'js/storage.js',
  'js/util.js',
  'js/data/categories.js',
  'js/data/flashcards.js',
  'js/data/quiz.js',
  'js/data/reference.js',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('shk-azubi-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Cache zuerst, sonst Netzwerk
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((hit) => hit || fetch(event.request)),
  );
});
