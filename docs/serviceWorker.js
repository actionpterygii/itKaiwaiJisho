"use strict";var CACHE_NAME="pwa-sample-caches",urlsToCache=["/","/index.html","/style.css","/script.js","/jisho.json","/favicon.ico"];self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(e){return e.addAll(urlsToCache)}))}),self.addEventListener("fetch",function(t){t.respondWith(caches.match(t.request).then(function(e){return e||fetch(t.request)}))});