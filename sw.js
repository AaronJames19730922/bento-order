const CACHE_NAME = 'bento-v8';
const ASSETS = [
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Outfit:wght@400;600;800&display=swap'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 強制立即接管
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // 刪除舊快取
          }
        })
      );
    })
  );
  self.clients.claim(); // 確保重新整理後立即套用新版本
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      // 網路優先，失敗才讀取快取 (Network First) 來確保始終抓取最新檔案
      return fetch(event.request).catch(() => response);
    })
  );
});
