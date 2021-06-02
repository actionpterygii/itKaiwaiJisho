// キャッシュファイルの指定
var CACHE_NAME = 'stop_super_suter';
var urlsToCache = [
    'index.html',
    'style.css',
    'script.js',
    'setServiceWorker.js',
    'pwacompat.min.js',
    'smoothscroll.min.js',
    'manifest.json',
    'jisho.json',
    'images/favicon.ico',
    'images/qrcode_1025.png',
    'images/hoshixxx_72.png',
    'images/hoshixxx_96.png',
    'images/hoshixxx_128.png',
    'images/hoshixxx_144.png',
    'images/hoshixxx_152.png',
    'images/hoshixxx_192.png',
    'images/hoshixxx_384.png',
    'images/hoshixxx_512.png',
    'images/hoshixxx.svg',
    'images/hoshixxx_a1.svg',
    'images/hoshixxx_a2.svg',
    'images/hoshixxx_a3.svg',
    'images/hoshixxx_a4.svg'
];

// インストール処理
// self.addEventListener('install', function(event)
// {
//     event.waitUntil(caches.open(CACHE_NAME).then(function(cache)
//     {
//         return cache.addAll(urlsToCache.map(function(url)
//         {
//             new Request(url, {credentials: 'same-origin'});
//         }));
//     }));
// });
self.addEventListener('install', function(event)
{
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache)
    {
        return cache.addAll(urlsToCache)
    }));
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

self.addEventListener('activate', function(event)
{
    event.waitUntil(caches.keys().then(function(keys)
    {
        return Promise.all(keys.filter(function(key)
        {
            return !CACHE_KEYS.includes(key);
        }
        ).map(function(key)
        {
            // 不要なキャッシュを削除
            return caches.delete(key);
        }));
    }));
});