import { Control } from "./control";

class Checkbox extends Control {
    getTemplate(): HTMLTemplateElement {
        return document.querySelector('#maff-checkbox')!;
    }
    
    static get observedAttributes() { return ['data-label']; }
}
customElements.define('maff-checkbox', Checkbox);

export { Checkbox };