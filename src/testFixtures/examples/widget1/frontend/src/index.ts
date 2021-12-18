import { foo } from '@skyrim-webui/frontend'

const h2 = document.createElement('h2')
h2.textContent = `Hi from Widget 1 TypeScript: ${foo}`
document.body.appendChild(h2)

const button = document.querySelector('button')
const textElement = document.querySelector('h3')
let timesClicked = 0

button!.onclick = (event) => {
    timesClicked++
    textElement!.textContent = `Times clicked ${timesClicked}`
}
