abstract class Control extends HTMLElement {
    protected display:HTMLParagraphElement;
    protected label:HTMLLabelElement;
    protected input:HTMLInputElement;
    protected updateListeners:Array<UpdateListener> = [];

    constructor() {
        super();
        
        const template:HTMLTemplateElement = this.getTemplate();
        console.log(template);
        const templateContent = template.content;

        this.attachShadow({ mode: "open" });
        this.shadowRoot!.appendChild(templateContent.cloneNode(true));

        this.display = this.shadowRoot!.querySelector('p')!;
        this.label = this.shadowRoot!.querySelector('label span')!;
        this.input = this.shadowRoot!.querySelector('input')!;
    }

    abstract getTemplate():HTMLTemplateElement;

    connectedCallback() {
        this.display.innerText = this.input.value;
        this.input.addEventListener('input', e => {
            this.display.innerText = (e.target as HTMLInputElement).value;
            this.updateListeners.forEach(listener => {
                if (listener.onUpdate === null) return;
                listener.onUpdate.call(listener, (e.target as HTMLInputElement).value);
            });
        });
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        if (oldValue === newValue) return;
        switch (name) {
            case "data-label":
                this.label.innerText = newValue;
                break;
        }
    }

    addUpdate(listener:UpdateListener) {
        this.updateListeners.push(listener);
    }
}

interface UpdateListener {
    onUpdate(newValue:string):void;
}

export { Control, UpdateListener };