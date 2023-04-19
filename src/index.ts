class MaffSlider extends HTMLElement {
    #display:HTMLParagraphElement;
    #label:HTMLLabelElement;
    #input:HTMLInputElement;
    #shadowRoot:ShadowRoot;
    #updateListeners:Array<UpdateListener> = [];

    constructor(id:string, label:string) {
        super();
        
        const template:HTMLTemplateElement = document.querySelector('#maff-slider')!;
        const templateContent = template.content;

        this.#shadowRoot = this.attachShadow({ mode: "open" });
        this.#shadowRoot.appendChild(templateContent.cloneNode(true));

        this.#display = this.#shadowRoot.querySelector('p')!;
        this.#label = this.#shadowRoot.querySelector('label span')!;
        this.#input = this.#shadowRoot.querySelector('input')!;
    }

    static get observedAttributes() { return ['data-label', 'data-min', 'data-max', 'data-step', 'data-value']; }

    connectedCallback() {
        this.#display.innerText = this.#input.value;
        this.#input.addEventListener('input', e => {
            this.#display.innerText = (e.target as HTMLInputElement).value;
            this.#updateListeners.forEach(listener => {
                listener.onUpdate.call(listener, (e.target as HTMLInputElement).value);
            });
        });
    }

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

    addOnUpdate(listener:UpdateListener) {
        this.#updateListeners.push(listener);
    }
}

interface UpdateListener {
    onUpdate:(newValue:string) => void;
}

customElements.define('maff-slider', MaffSlider);

class LabeledControl extends HTMLElement {
    #display:
}