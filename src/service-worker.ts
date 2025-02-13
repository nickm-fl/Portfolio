/// <reference lib="webworker" />
/* Use type assertion instead of redeclaring self */
const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = 'portfolio-cache-v1';

const ASSETS_TO_CACHE = [
  // Cache critical SVGs immediately
  '/critical-svgs/*.svg',
];

const LAZY_ASSETS = [
  // Cache non-critical SVGs on demand
  '/decorative-svgs/*.svg'
];

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