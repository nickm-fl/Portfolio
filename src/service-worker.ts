/// <reference lib="webworker" />
/* Use type assertion instead of redeclaring self */
const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = 'portfolio-cache-v1';

sw.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/webp/Profile_Photo_2023_Cropped.webp',
        // Add other critical assets
      ]);
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
}); 