const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";

const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/snapup-icon-192.png",
  "/snapup-icon-512.png",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");

  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching app shell");

      return cache.addAll(assets);
    }),
  );
});
self.addEventListener("activate", (evt) => {
  console.log("service worker activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key)),
      );
    }),
  );
});
// do not really need this as the app is pretty much static
self.addEventListener("fetch", (evt) => {
  if (!evt.request.url.startsWith("http")) {
    return;
  }

  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(evt.request, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    }),
  );
});
