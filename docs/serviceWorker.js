"use strict";var CACHE_NAME="superSimpleCache",urlsToCache=["index.html","style.css","script.js","setServiceWorker.js","pwacompat.min.js","smoothscroll.min.js","manifest.json","jisho.json","images/favicon.ico","images/hoshixxx_72.png","images/hoshixxx_96.png","images/hoshixxx_128.png","images/hoshixxx_144.png","images/hoshixxx_152.png","images/hoshixxx_192.png","images/hoshixxx_384.png","images/hoshixxx_512.png","images/hoshixxx.svg","images/qrcode_1025.png"];self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(e){return e.addAll(urlsToCache)}))}),self.addEventListener("fetch",function(s){s.respondWith(caches.match(s.request).then(function(e){return e||fetch(s.request)}))}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return!CACHE_KEYS.includes(e)}).map(function(e){return caches.delete(e)}))}))});