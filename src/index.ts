class MaffSlider extends HTMLElement {
    #display:HTMLParagraphElement;
    #label:HTMLLabelElement;
    #input:HTMLInputElement;
    #shadowRoot:ShadowRoot;
    #linkedTo:Array<LinkTarget> = [];

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
            this.#linkedTo.forEach(target => {
                target.obj[target.key] = (e.target as HTMLInputElement).value;
            })
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

    link(target:LinkTarget) {
        this.#linkedTo.push(target);
    }
}

interface LinkTarget {
    key:string;
    obj:object;
}

customElements.define('maff-slider', MaffSlider);