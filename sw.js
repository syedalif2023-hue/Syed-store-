const CACHE_NAME = 'syed-poultry-v2'; // Har bade update par v1 ko v2 kar dein
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'rates.json',
  'https://i.postimg.cc/htB6KXHz/Screenshot-2026-0322-222857.png'
];

// 1. Install Event: Files ko cache mein save karna
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Files Caching Ho Rahi Hai...');
      return cache.addAll(urlsToCache);
    })
  );
  // Naya service worker turant active ho jaye
  self.skipWaiting();
});

// 2. Activate Event: Purane cache ko delete karna
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Purana Cache Delete Ho Raha Hai...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch Event: Rates ke liye Network First strategy
self.addEventListener('fetch', (event) => {
  // Agar rates.json mangi ja rahi hai toh pehle internet se lao
  if (event.request.url.includes('rates.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone()); // Cache update karo
            return response;
          });
        })
        .catch(() => caches.match(event.request)) // Internet na ho toh purana dikhao
    );
  } else {
    // Baaki files ke liye Cache first taaki app fast chale
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
