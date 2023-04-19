abstract class Control extends HTMLElement {
    #display:HTMLParagraphElement;
    #label:HTMLLabelElement;
    #input:HTMLInputElement;
    #shadowRoot:ShadowRoot;
    // #updateListeners:UpdateListener;

    constructor() {
        super();
        
        const template:HTMLTemplateElement = this.getTemplate();
        const templateContent = template.content;

        this.#shadowRoot = this.attachShadow({ mode: "open" });
        this.#shadowRoot.appendChild(templateContent.cloneNode(true));

        this.#display = this.#shadowRoot.querySelector('p')!;
        this.#label = this.#shadowRoot.querySelector('label span')!;
        this.#input = this.#shadowRoot.querySelector('input')!;
    }

    abstract getTemplate():HTMLTemplateElement;

    static get observedAttributes() { return ['data-label']; }

    connectedCallback() {
        this.#display.innerText = this.#input.value;
        this.#input.addEventListener('input', e => {
            this.#display.innerText = (e.target as HTMLInputElement).value;
        });
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue === newValue) return;
        switch (name) {
            case "data-label":
                this.#label.innerText = newValue;
                break;
        }
    }
}

export { Control };