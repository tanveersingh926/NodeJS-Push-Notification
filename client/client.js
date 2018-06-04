// base 64 conversion function
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const publicVapidKey = "BMHNtzeVjcV2Hg2uWWA1-A0InPAHK4ZqwLer7JlfkD2lE5kYSPaVDSVtDcrjnoBGaWdOIAK4mnu5zsn5g-5rzBs";


// register SW, Register Push, Send Push
async function send(){
    // Registering service worker
    console.log("Registering service worker...")
    const register = await navigator.serviceWorker.register("./worker.js", {
        scope:"/"
    })
    console.log("Service Worker Registered..")

    // Registering Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
    })
    console.log("Push Registered...");

    // Send Push Notification
    console.log("Sending Push..")
    await fetch("/subscribe", {
        method:"POST",
        body:JSON.stringify(subscription),
        headers:{
            'content-type':"application/json"
        }
    })
    console.log("Push Sent..")
}




// Check for service workers
if('serviceWorker' in navigator) {
    send()
    .catch(err => console.log(err))
}
