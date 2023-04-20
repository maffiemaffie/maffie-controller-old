import { Control } from "./control.js";
class Checkbox extends Control {
    getTemplate() {
        return document.querySelector('#maff-checkbox');
    }
    static get observedAttributes() { return ['data-label']; }
}
customElements.define('maff-checkbox', Checkbox);
export { Checkbox };
