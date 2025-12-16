// sw.js
const CACHE = "pra-hub-v1";
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","index.html","manifest.webmanifest"])));
});
self.addEventListener("activate", e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e=>{
  const req=e.request;
  e.respondWith(caches.match(req).then(r=> r || fetch(req).then(res=>{
    const copy=res.clone();
    caches.open(CACHE).then(c=>c.put(req,copy));
    return res;
  }).catch(()=>caches.match("./"))));
});