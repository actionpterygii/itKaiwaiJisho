
// キャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/jisho.json',
    '/favicon.ico'
];

// インストール処理
self.addEventListener('install', function(event)
{
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache)
        {
            return cache.addAll(urlsToCache);
        })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event)
{
    event.respondWith(caches.match(event.request).then(function(response)
    {
        if (response)
        {
            return response;
        }
        return fetch(event.request);
    }));
});