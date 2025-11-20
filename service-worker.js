// Define the files to cache
const CACHE_NAME = 'bmi-calculator-v1';
const urlsToCache = [
    '/bmi_calculator.html',
    '/manifest.json',
    // IMPORTANT: In a real app, you would include your actual icon files here:
    // '/icon-192x192.png', 
    // '/icon-512x512.png',
];


// Install event: Caches all required files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache, adding files...');
                return cache.addAll(urlsToCache);
            })
    );
});


// Fetch event: Intercepts network requests and serves cached files if available
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // No cache hit - fetch from network
                return fetch(event.request);
            })
    );
});


// Activate event: Cleans up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});



