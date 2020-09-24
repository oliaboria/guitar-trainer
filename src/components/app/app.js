import { NOTES, OCTAVES } from '../../constants';
import getRandomInt from '../../utils/getRandomInt';

import template from './app.template';

class App extends HTMLElement {
    #root;
    #musicNoteEl;
    #messageEl;
    #nextNoteBtn;

    #note;
    #octave;

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.#root.appendChild(template.content.cloneNode(true));

        this.#musicNoteEl = this.#root.querySelector('music-note');
        this.#messageEl = this.#root.querySelector('message');
        this.#nextNoteBtn = this.#root.querySelector('.next-note-btn');

        this.#note = NOTES[getRandomInt(NOTES.length)];
        this.#octave = OCTAVES[getRandomInt(OCTAVES.length)];

        console.log(this.#note);
        this.render();
    }

    render() {
        this.#musicNoteEl.setAttribute('note', this.#note);
        this.#musicNoteEl.setAttribute('octave', this.#octave);
    }
}

export default App;
