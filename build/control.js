class Control extends HTMLElement {
    constructor() {
        super();
        this.updateListeners = [];
        const template = this.getTemplate();
        console.log(template);
        const templateContent = template.content;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateContent.cloneNode(true));
        this.display = this.shadowRoot.querySelector('p');
        this.label = this.shadowRoot.querySelector('label span');
        this.input = this.shadowRoot.querySelector('input');
    }
    connectedCallback() {
        this.display.innerText = this.input.value;
        this.input.addEventListener('input', e => {
            this.display.innerText = e.target.value;
            this.updateListeners.forEach(listener => {
                if (listener.onUpdate === null)
                    return;
                listener.onUpdate.call(listener, e.target.value);
            });
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "data-label":
                this.label.innerText = newValue;
                break;
        }
    }
    addUpdate(listener) {
        this.updateListeners.push(listener);
    }
}
export { Control };
