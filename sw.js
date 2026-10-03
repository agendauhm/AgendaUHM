const C='consultorios-v4',A=['./','index.html','firebase-config.js','manifest.json','logo.png','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request);
    const net=fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}).catch(()=>hit);
    return hit||net}));
});
