const CACHE_NAME = 'nexy-animes-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style/style-index.css',
  '/Js/search.js',
  '/Js/dragger.js',
  '/style/components/Nexy Animes logo.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Arquivos em cache durante a instalação');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
