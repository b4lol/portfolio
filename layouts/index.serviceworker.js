const CACHE = {{ printf "%s-%s" (site.Title | urlize) (site.Params.assets.swCacheVersion | default "v1") | jsonify }};
const FINGERPRINTED = /\.[a-f0-9]{64}\.(css|js)$/;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    const { request } = e;
    const url = new URL(request.url);

    if (request.method !== 'GET' || url.origin !== location.origin) return;

    if (FINGERPRINTED.test(url.pathname)) {
        e.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached;
                return fetch(request).then(res => {
                    return caches.open(CACHE).then(c => c.put(request, res.clone())).then(() => res);
                });
            })
        );
    } else if (request.headers.get('accept')?.includes('text/html')) {
        // Strip query strings so every tracking variant does not create a new cache entry.
        const cacheKey = new URL(request.url);
        cacheKey.search = '';
        e.respondWith(
            fetch(request).then(res => {
                return caches.open(CACHE).then(c => c.put(cacheKey, res.clone())).then(() => res);
            }).catch(() => caches.match(cacheKey))
        );
    }
});
