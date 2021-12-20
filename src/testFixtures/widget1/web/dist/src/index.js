import { SomethingFromWeb } from '@skyrim-webui/web';
document.querySelector('button').onclick = function () {
    alert('Hello, you clicked a button in Skyrim');
};
document.querySelector('h1').textContent = "Loaded From @skyrim-webui: ".concat(SomethingFromWeb);
