const CACHE_NAME = "react-chat-cache";

self.addEventListener("activate", event => {
  const cacheWhiteList = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (!cacheWhiteList.includes(key)) {
            console.log(`Удален кэш ${key}.`);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      fetch("/manifest/manifest.json")
        .then(response => response.json())
        .then(assets => {
          const urlToCache = ["/chat/*"];
          return cache.addAll(urlToCache);
        });
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", event => {
  console.info("Event: push.");
  let title = "Новое уведомление";
  let body = {
    body: "Нажми, чтобы открыть.",
    tag: "pwa",
    icon: "./manifest/chat-icon-48.png"
  };

  event.waitUntil(self.registration.showNotofocation(title, body));
});
