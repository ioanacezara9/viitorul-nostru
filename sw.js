const CACHE="our-future-v3";
const FILES=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./assets/icon.svg",
"./assets/memory-01.jpg","./assets/memory-02.jpg","./assets/memory-03.jpg","./assets/memory-04.jpg","./assets/memory-05.jpg","./assets/memory-06.jpg","./assets/memory-07.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
