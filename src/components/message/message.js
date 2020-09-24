class Message extends HTMLElement {
    #root;
    #containerEl;

    static get observedAttributes() {
        return ['info'];
    }

    get #info() {
        return JSON.parse(this.getAttribute('info')) || {};
    }

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.#containerEl = document.createElement('div');
        this.#root.appendChild(this.#containerEl);

        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const { key, octave, isCorrect } = this.#info;

        this.#containerEl.innerText = `${key}${octave}: ${isCorrect}`;
    }
}

export default Message;
