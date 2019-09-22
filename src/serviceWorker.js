// キャッシュファイルの指定
const CACHE_NAME = 'itKaiwaiJishoCaches';
// const CACHE_KEYS = [CACHE_NAME];
var urlsToCache = [
    './index.html',
    './style.css',
    './script.js',
    './jisho.json',
    './images/favicon.ico'
];

// インストール処理
self.addEventListener('install', function(event)
{
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache)
    {
        return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
        // .map(function(url)
        // {
        //         new Request(url, {credentials: 'same-origin'})
        // }));
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

// self.addEventListener('activate', function(event)
// {
//     event.waitUntil(caches.keys().then(function(keys)
//     {
//         return Promise.all(keys.filter(function(key)
//         {
//             return !CACHE_KEYS.includes(key);
//         }
//         ).map(function(key)
//         {
//             // 不要なキャッシュを削除
//             return caches.delete(key);
//         }));
//     }));
// });