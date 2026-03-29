const CACHE_NAME = 'syed-poultry-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'rates.json', // Rates file ko yahan link kar diya hai
  'https://i.postimg.cc/htB6KXHz/Screenshot-2026-0322-222857.png' // Logo cache
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Strategy: Network first, then fallback to Cache
// Taaki jab internet ho toh naye rates load hon, warna purane dikhayi dein
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
