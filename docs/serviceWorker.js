"use strict";var CACHE_NAME="itKaiwaiJishoCaches",urlsToCache=["/","./index.html","./style.css","./script.js","./jisho.json","./images/favicon.ico"];self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(e){return e.addAll(urlsToCache.map(function(e){return new Request(e,{credentials:"same-origin"})}))}))}),self.addEventListener("fetch",function(t){t.respondWith(caches.match(t.request).then(function(e){return e||fetch(t.request)}))});