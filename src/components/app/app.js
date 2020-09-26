import { parse } from 'query-string';

import { NOTES, OCTAVES, MODES } from '../../constants';
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
    #mode;

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });

        this.nextButtonClickHandler = this.nextButtonClickHandler.bind(this);
        this.noteDetectedHandler = this.noteDetectedHandler.bind(this);

        this.#detectInstrument();
    }

    #isNoteCorrect({ key, octave }) {
        return this.#note === key && this.#octave === octave;
    }

    #generateRandomNote() {
        this.#note = NOTES[getRandomInt(NOTES.length)];
        this.#octave = OCTAVES[getRandomInt(OCTAVES.length)];
    }

    #detectInstrument() {
        const { mode } = parse(window.location.search);

        this.#mode = MODES[mode?.toLowerCase()] || 0;
    }

    connectedCallback() {
        this.#root.appendChild(template.content.cloneNode(true));

        this.#musicNoteEl = this.#root.querySelector('music-note');
        this.#messageEl = this.#root.querySelector('result-message');
        this.#nextNoteBtn = this.#root.querySelector('.next-note-btn');

        this.#musicNoteEl.setAttribute('shift', this.#mode);
        this.#generateRandomNote();

        this.render();

        eventEmitter.on('noteDetected', this.noteDetectedHandler);

        this.#nextNoteBtn.addEventListener(
            'click',
            this.nextButtonClickHandler,
        );
    }

    disconnectedCallback() {
        eventEmitter.removeListener('noteDetected', this.noteDetectedHandler);
    }

    render() {
        const note = JSON.stringify({ key: this.#note, octave: this.#octave });

        this.#musicNoteEl.setAttribute('note', note);
    }

    nextButtonClickHandler() {
        this.#generateRandomNote();
        this.#messageEl.setAttribute('info', JSON.stringify({}));
        this.render();
    }

    noteDetectedHandler(note) {
        const isCorrect = this.#isNoteCorrect(note);

        this.#messageEl.setAttribute(
            'info',
            JSON.stringify({ isCorrect, ...note }),
        );
    }
}

export default App;
