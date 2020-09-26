import { NOTES, OCTAVES } from '../../constants';
import eventEmitter from '../../utils/eventEmitter';
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
        this.#messageEl = this.#root.querySelector('result-message');
        this.#nextNoteBtn = this.#root.querySelector('.next-note-btn');

        this.#generateRandomNote();

        this.render();

        eventEmitter.on('noteDetected', (note) => {
            const isCorrect = this.#isNoteCorrect(note);
            this.#messageEl.setAttribute(
                'info',
                JSON.stringify({ isCorrect, ...note }),
            );
        });

        this.#nextNoteBtn.addEventListener('click', () => {
            this.#generateRandomNote();
            this.#messageEl.setAttribute('info', JSON.stringify({}));
            this.render();
        });
    }

    render() {
        const note = JSON.stringify({ key: this.#note, octave: this.#octave });
        this.#musicNoteEl.setAttribute('note', note);
    }

    #isNoteCorrect({ key, octave }) {
        return this.#note === key && this.#octave === octave;
    }

    #generateRandomNote() {
        this.#note = NOTES[getRandomInt(NOTES.length)];
        this.#octave = OCTAVES[getRandomInt(OCTAVES.length)];
    }
}

export default App;
