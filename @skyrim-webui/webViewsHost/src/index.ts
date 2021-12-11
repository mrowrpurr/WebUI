const h1 = document.createElement('h1')
h1.textContent = 'Hi Kirglow this is TS'
document.body.appendChild(h1)

const iframe = document.createElement('iframe')
iframe.src = 'http://localhost:8080/examples/SkyrimPlatform/NumberOfItems/NumberOfItems.html'
document.body.appendChild(iframe);

(window as any).onSkyrimPlatformMessage({ sup: "HI THERE I AM HTML YO" });