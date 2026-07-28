/* Mode hors-ligne : une fois la page ouverte une fois,
   l'application fonctionne même sans internet. */
const CACHE = "exomots-v1";
const FICHIERS = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "mots.js",
  "manifest.webmanifest",
  "icons/icon.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(cles =>
      Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Réseau d'abord (pour recevoir les nouveaux mots), cache en secours. */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(rep => {
        const copie = rep.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie));
        return rep;
      })
      .catch(() => caches.match(e.request))
  );
});
