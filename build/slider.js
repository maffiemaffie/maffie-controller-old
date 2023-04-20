import { Control } from "./control.js";
class Slider extends Control {
    getTemplate() {
        return document.querySelector('#maff-slider');
    }
    static get observedAttributes() { return ['data-label', 'data-min', 'data-max', 'data-step', 'data-value']; }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "data-label":
                this.label.innerText = newValue;
                break;
            case "data-min":
                this.input.min = newValue;
                break;
            case "data-max":
                this.input.max = newValue;
                break;
            case "data-step":
                this.input.step = newValue;
                break;
            case "data-value":
                this.input.value = newValue;
                break;
        }
    }
}
customElements.define('maff-slider', Slider);
export { Slider };
