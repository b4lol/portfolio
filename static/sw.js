const CACHE = 'b4lol-v1';
// Matches Hugo's fingerprinted asset filenames: a 64-char hex hash before the extension
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
        // Cache-first: content-addressed assets are immutable
        e.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached;
                return fetch(request).then(res => {
                    caches.open(CACHE).then(c => c.put(request, res.clone()));
                    return res;
                });
            })
        );
    } else if (request.headers.get('accept')?.includes('text/html')) {
        // Network-first for HTML: serve fresh content, cache as fallback
        e.respondWith(
            fetch(request).then(res => {
                caches.open(CACHE).then(c => c.put(request, res.clone()));
                return res;
            }).catch(() => caches.match(request))
        );
    }
});
