const CACHE_NAME = 'syed-poultry-v3'; // Is baar v3 kar diya hai taaki pichla cache clear ho jaye
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'rates.json',
  // Naya logo link yahan add kar diya hai
  'https://i.postimg.cc/qvGvWHfH/file-000000002d5871fa94f7e776546c7e6f.jpg'
];

// 1. Install Event: Nayi files (including naya logo) cache mein save karega
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Naya Logo aur Files Cache Ho Rahi Hai...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); 
});

// 2. Activate Event: Purane v1 ya v2 cache ko delete karega
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Purana Cache (v1/v2) Saaf Ho Raha Hai...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Turant control lene ke liye
  return self.clients.claim();
});

// 3. Fetch Event: Rates ke liye Network First, baaki ke liye Cache First
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('rates.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
