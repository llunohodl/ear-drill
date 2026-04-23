const CACHE_NAME = 'note-drill-v1';

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) 
        return cachedResponse;
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone()); 
          return response;
        });
      });
    })
  );
});
