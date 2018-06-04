console.log("Service Worker Loaded")

self.addEventListener('push', e=>{
    const data = e.data.json();
    console.log("Push recieved...");
    self.registration.showNotification(data.title, {
        body:"Notified By Tanveer Singh",
        icon:"https://raw.githubusercontent.com/snwh/paper-icon-theme/master/Paper/512x512/categories/preferences-system-power.png"
    })
})