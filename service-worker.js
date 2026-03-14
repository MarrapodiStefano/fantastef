const CACHE_NAME = "fantastef-cache-v2";

const urlsToCache = [
"/",
"/home-app.html",
"/comparatore.html",
"/fantaxi.html",
"/giocatore.html",
"/manifest.json",
"/icon-192.png",
"/icon-512.png",
"/giocatori_master.json"
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

if (event.request.mode === "navigate") {
event.respondWith(fetch(event.request));
return;
}

event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})
);

});
