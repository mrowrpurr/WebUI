import { foo } from '@skyrim-webui/frontend'

const h2 = document.createElement('h2')
h2.textContent = `Hi from Widget 1 TypeScript: ${foo}`
document.body.appendChild(h2)

