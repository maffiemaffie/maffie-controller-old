import { Control } from "./control";
class Slider extends Control {
    constructor() {
        super();
    }

    getTemplate(): HTMLTemplateElement {
        return document.querySelector('#maff-slider')!;
    }

    static get observedAttributes() { return ['data-label', 'data-min', 'data-max', 'data-step', 'data-value']; }

    attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue === newValue) return;
        switch (name) {
            case "data-label":
                this.#label.innerText = newValue;
                break;
            case "data-min":
                this.#input.min = newValue;
                break;
            case "data-max":
                this.#input.max = newValue;
                break;
            case "data-step":
                this.#input.step = newValue;
                break;
            case "data-value":
                this.#input.value = newValue;
                break;
        }
    }
}