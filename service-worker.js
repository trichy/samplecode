(function () {
    'use strict';

    //TODO: load API call responses into the cache using the cache API elsewhere in the code, since the calls are async

    // Base URL of this website (set automatically in the install handler)
    var WEBSITE_BASE_URL = '/';

    var CDN_BASE_URL = 'https://dev.selectionnavigator.com/common/';

    // Update 'version' if you need to refresh the cache
    var version = 'AHU v2 Worker 1.0';
    var offlineUrl = '';

    // Store core files in a cache (including a page to display when offline)
    function updateStaticCache() {
        return caches.open(version)
            .then(function (cache) {
                return cache.addAll([
                    offlineUrl,
                    WEBSITE_BASE_URL,
                    WEBSITE_BASE_URL + 'customer-preferences',
                    WEBSITE_BASE_URL + 'specification',
                    WEBSITE_BASE_URL + 'unit-selection',
                    CDN_BASE_URL + 'Scripts/common.js',
                    CDN_BASE_URL + 'Scripts/toastr.min.js',
                    //WEBSITE_BASE_URL + 'unit-configuration', --causing a toastr error & prevents manifest from working
                    WEBSITE_BASE_URL + 'messages',
                    WEBSITE_BASE_URL + 'unit-summary',
                    CDN_BASE_URL + 'infragistics.2016.1/css/structure/infragistics.css',
                    CDN_BASE_URL + 'content/infragistics/infragistics.theme.css',
                    CDN_BASE_URL + 'content/bootstrap.css',
                    WEBSITE_BASE_URL + 'css/bootstrap-switch.min.css',
                    CDN_BASE_URL + 'content/font-awesome.css',
                    CDN_BASE_URL + 'content/toastr.css',
                    CDN_BASE_URL + 'content/jci-style-guide.css',
                    WEBSITE_BASE_URL + 'css/style.css',
                    WEBSITE_BASE_URL + 'images/svg/bars.svg',
                    CDN_BASE_URL + 'Plugins/jQuery-lib/2.0.3/jquery.min.js',
                    CDN_BASE_URL + 'Plugins/jquery-ui/jquery-ui.js',
                    CDN_BASE_URL + 'Scripts/jquery.validate.js',
                    CDN_BASE_URL + 'Scripts/spin.min.js',
                    CDN_BASE_URL + 'Infragistics.2016.1/js/infragistics.core.js',
                    CDN_BASE_URL + 'Infragistics.2016.1/js/infragistics.lob.js',
                    CDN_BASE_URL + 'Plugins/bootstrap/js/bootstrap.js',
                    WEBSITE_BASE_URL + 'js/bootstrap-switch.min.js',
                    WEBSITE_BASE_URL + 'js/3d/three.min.js',
                    WEBSITE_BASE_URL + 'js/3d/controls/OrbitControls.js',
                    WEBSITE_BASE_URL + 'js/3d/loaders/ColladaLoader.js',
                    WEBSITE_BASE_URL + 'js/3d/Detector.js',
                    WEBSITE_BASE_URL + 'js/3d/libs/stats.min.js',
                    WEBSITE_BASE_URL + 'js/3d/three-dimensional-presenter-module.js',
                    WEBSITE_BASE_URL + 'js/3d/models/filter-bank/filter/model.dae',
                    WEBSITE_BASE_URL + 'js/3d/models/filter-bank/model.dae',
                    WEBSITE_BASE_URL + 'js/3d/models/filter-bank/model/__auto_5.jpg',
                    //WEBSITE_BASE_URL + 'js/3d/models/filter-bank/model/Wood_Board_OSB.jpg',
                    //WEBSITE_BASE_URL + 'js/3d/models/filter-bank/model/Wood_Cherry.jpg',
                    //WEBSITE_BASE_URL + 'js/3d/models/filter-bank/model/Wood_Paper.jpg',
                ]);
            });
    }

    function addToCache(request, response) {
        if (!response.ok)
            return;

        var copy = response.clone();
        caches.open(version)
            .then(function (cache) {
                cache.put(request, copy);
            });
    }

    function serveOfflineImage(request) {
        if (request.headers.get('Accept').indexOf('image') !== -1) {
            return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', { headers: { 'Content-Type': 'image/svg+xml' } });
        }
    }

    self.addEventListener('install', function (event) {
        WEBSITE_BASE_URL = self.registration.scope;
        offlineUrl = WEBSITE_BASE_URL + "offline.html";
        event.waitUntil(updateStaticCache());
    });

    self.addEventListener('activate', function (event) {
        event.waitUntil(
            caches.keys()
                .then(function (keys) {
                    // Remove caches whose name is no longer valid
                    return Promise.all(keys
                        .filter(function (key) {
                            return key.indexOf(version) !== 0;
                        })
                        .map(function (key) {
                            return caches.delete(key);
                        })
                    );
                })
        );
    });

    self.addEventListener('fetch', function (event) {
        var request = event.request;

        // Always fetch non-GET requests from the network
        if (request.method !== 'GET' || request.url.match(/\/browserLink/ig)) {
            event.respondWith(
                fetch(request)
                    .catch(function () {
                        return caches.match(offlineUrl);
                    })
            );
            return;
        }

        // For HTML requests, try the network first, fall back to the cache, finally the offline page
        if (request.headers.get('Accept').indexOf('text/html') !== -1) {
            event.respondWith(
                fetch(request)
                    .then(function (response) {
                        // Stash a copy of this page in the cache
                        addToCache(request, response);
                        return response;
                    })
                    .catch(function () {
                        return caches.match(request)
                            .then(function (response) {
                                return response || caches.match(offlineUrl);
                            });
                    })
            );
            return;
        }

        // cache first for fingerprinted resources
        if (request.url.match(/(\?|&)v=/ig)) {
            event.respondWith(
                caches.match(request)
                    .then(function (response) {
                        return response || fetch(request)
                            .then(function (response) {
                                addToCache(request, response);
                                return response || serveOfflineImage(request);
                            })
                            .catch(function () {
                                return serveOfflineImage(request);
                            });
                    })
            );

            return;
        }

        // network first for non-fingerprinted resources
        event.respondWith(
            fetch(request)
                .then(function (response) {
                    // Stash a copy of this page in the cache
                    addToCache(request, response);
                    return response;
                })
                .catch(function () {
                    return caches.match(request)
                        .then(function (response) {
                            return response || serveOfflineImage(request);
                        })
                        .catch(function () {
                            return serveOfflineImage(request);
                        });
                })
        );
    });

})();