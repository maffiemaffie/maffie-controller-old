"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MaffSlider_display, _MaffSlider_label, _MaffSlider_input, _MaffSlider_shadowRoot, _MaffSlider_updateListeners;
class MaffSlider extends HTMLElement {
    constructor(id, label) {
        super();
        _MaffSlider_display.set(this, void 0);
        _MaffSlider_label.set(this, void 0);
        _MaffSlider_input.set(this, void 0);
        _MaffSlider_shadowRoot.set(this, void 0);
        _MaffSlider_updateListeners.set(this, []);
        const template = document.querySelector('#maff-slider');
        const templateContent = template.content;
        __classPrivateFieldSet(this, _MaffSlider_shadowRoot, this.attachShadow({ mode: "open" }), "f");
        __classPrivateFieldGet(this, _MaffSlider_shadowRoot, "f").appendChild(templateContent.cloneNode(true));
        __classPrivateFieldSet(this, _MaffSlider_display, __classPrivateFieldGet(this, _MaffSlider_shadowRoot, "f").querySelector('p'), "f");
        __classPrivateFieldSet(this, _MaffSlider_label, __classPrivateFieldGet(this, _MaffSlider_shadowRoot, "f").querySelector('label span'), "f");
        __classPrivateFieldSet(this, _MaffSlider_input, __classPrivateFieldGet(this, _MaffSlider_shadowRoot, "f").querySelector('input'), "f");
    }
    static get observedAttributes() { return ['data-label', 'data-min', 'data-max', 'data-step', 'data-value']; }
    connectedCallback() {
        __classPrivateFieldGet(this, _MaffSlider_display, "f").innerText = __classPrivateFieldGet(this, _MaffSlider_input, "f").value;
        __classPrivateFieldGet(this, _MaffSlider_input, "f").addEventListener('input', e => {
            __classPrivateFieldGet(this, _MaffSlider_display, "f").innerText = e.target.value;
            __classPrivateFieldGet(this, _MaffSlider_updateListeners, "f").forEach(listener => {
                listener.onUpdate.call(listener, e.target.value);
            });
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        switch (name) {
            case "data-label":
                __classPrivateFieldGet(this, _MaffSlider_label, "f").innerText = newValue;
                break;
            case "data-min":
                __classPrivateFieldGet(this, _MaffSlider_input, "f").min = newValue;
                break;
            case "data-max":
                __classPrivateFieldGet(this, _MaffSlider_input, "f").max = newValue;
                break;
            case "data-step":
                __classPrivateFieldGet(this, _MaffSlider_input, "f").step = newValue;
                break;
            case "data-value":
                __classPrivateFieldGet(this, _MaffSlider_input, "f").value = newValue;
                break;
        }
    }
    addOnUpdate(listener) {
        __classPrivateFieldGet(this, _MaffSlider_updateListeners, "f").push(listener);
    }
}
_MaffSlider_display = new WeakMap(), _MaffSlider_label = new WeakMap(), _MaffSlider_input = new WeakMap(), _MaffSlider_shadowRoot = new WeakMap(), _MaffSlider_updateListeners = new WeakMap();
customElements.define('maff-slider', MaffSlider);
