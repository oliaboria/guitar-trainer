import template from './message.template';

const CORRECT_COLOR = 'LightGreen';
const INCORRECT_COLOR = 'LightCoral';

class Message extends HTMLElement {
    #root;
    #containerEl;
    #contentEl;

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
        this.#root.appendChild(template.content.cloneNode(true));

        this.#containerEl = this.#root.querySelector('wired-card');
        this.#contentEl = this.#root.querySelector('.content');

        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const { key, octave, isCorrect } = this.#info;
        const color = isCorrect ? CORRECT_COLOR : INCORRECT_COLOR;

        this.#containerEl.classList.toggle('hidden', !key && !octave);
        this.#contentEl.innerText = `${key}${octave}`;
        this.#containerEl.setAttribute('fill', color);
    }
}

export default Message;
