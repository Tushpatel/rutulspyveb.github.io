'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "bb6973ee8e2d3328eadfe6277bfcc650",
"index.html": "7794315094a3c1c4389cdf1e1e4d605d",
"/": "7794315094a3c1c4389cdf1e1e4d605d",
"main.dart.js": "dd6dbf283e2733fafe9089228072841a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "a7c358315300af9fea61b8e3fc61249a",
"assets/AssetManifest.json": "9de39adfe9bf347146d8214f87d1b9c7",
"assets/NOTICES": "6dce9d975716962bcb02c70cd55372e5",
"assets/FontManifest.json": "b96ed4654c306af00bc2b5da14b61955",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/assets/images/upload_files.png": "3cfb189587b16102088bc9654bff4afc",
"assets/assets/images/cliam.svg": "c8a54c0909e28799815a226be5f5ac3d",
"assets/assets/images/email_popup_web.png": "d631619f7e178da241a983ded4e122b3",
"assets/assets/images/home.svg": "a75eeeda9ade2f41e89c6be5dcf9700c",
"assets/assets/images/eye_hidden.png": "ede6cf89901663bc596f8884c41b9f0d",
"assets/assets/images/thanks_general_photo_poopup.png": "c08bb9ae384d175faf679448ac015207",
"assets/assets/images/left_arrow.svg": "f00698c2f710f017018eb851b4738ffa",
"assets/assets/images/email_popup.png": "8446f125eb6d9b74368f1a6acd9e5075",
"assets/assets/images/call_back_popup.png": "86419f0fb55542550610336ede9e3bb4",
"assets/assets/images/inbox_icon.png": "a08c90ad1e61a3bdbaff7c870503d8d6",
"assets/assets/images/add.svg": "c73191eebe3dcff2c8fa88b67604e9b0",
"assets/assets/images/eye_view.png": "d7b229d7a945a893aa86f36e3a975f52",
"assets/assets/images/close_icon.svg": "a40a5af9d52cceeb30cc8ac7098b7d54",
"assets/assets/images/logo.png": "d65288735b55d0d9cddc0059325ebc59",
"assets/assets/images/right_arrow_circle.svg": "0c90b51f7fd8e6653cfd5c09d37b2919",
"assets/assets/images/splash_screen.png": "780108504683ebe22971232ec9bc45bb",
"assets/assets/images/calendar_icon.png": "3b05c9dea1f4aeeeb86241dd9b128d58",
"assets/assets/images/clock.png": "54a3f1884baa28b789a69c384a7c5c95",
"assets/assets/images/pencil.svg": "8da415790dcbdf550d117135caeaba87",
"assets/assets/images/call.svg": "c523e427394de6483ff191378c92b0af",
"assets/assets/images/profile.svg": "a4d5ad3ede59fb77127e3e4618ede82c",
"assets/assets/images/star.png": "1dd4dda454d1031aad0e03c8421dd7f4",
"assets/assets/images/close_round.svg": "46a8868db23385f1bc19b410a917a5eb",
"assets/assets/images/lock_icon.png": "fc5d4085b6e96f4fd73227ab899870f8",
"assets/assets/images/left_back.svg": "1f302ec899fb9e1bd45bf64d2e954b87",
"assets/assets/images/cancel_image.svg": "9f90c0e6ce5bd3f1db1691b3ceec1b6c",
"assets/assets/images/right_back.svg": "dcfc41a5853505a7f40c974f785ca026",
"assets/assets/images/profile_blank.svg": "e392802dca813c158ca032cb614913bf",
"assets/assets/cfg/configurations.json": "1ca93f1ca04901dbb004cb014abb8049",
"assets/assets/ttficon/call.ttf": "39e6eb8ba42f2ded0dea7d1ef05b789d",
"assets/assets/ttficon/home.ttf": "99db122f6ca366a10c424f81ea651daa",
"assets/assets/ttficon/claim.ttf": "a56e032e351005aa0bbba459b7b2756b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
