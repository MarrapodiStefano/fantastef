const CACHE_NAME = "fantastef-cache-v1";

const urlsToCache = [
"/",
"/home-app.html",
"/comparatore.html",
"/fantaxi.html",
"/giocatore.html",
"/manifest.json",
"/icon-192.png",
"/icon-512.png"
];

self.addEventListener("install", event => {

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})
);

});

self.addEventListener("fetch", event => {

event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})
);

});