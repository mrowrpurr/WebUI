import { SomethingFromWeb } from '@skyrim-webui/web'

document.querySelector('button')!.onclick = () => {
    alert('Hello, you clicked a button in Skyrim')
}

document.querySelector('h1')!.textContent = `Loaded From @skyrim-webui: ${SomethingFromWeb}`
