import { PitchDetector } from 'pitchy';

import audio from '../../utils/audio';
import detectNote from '../../utils/detectNote';

import template from './mic-btn.template';

class MicBtn extends HTMLElement {
    #root;
    #btnEl;
    #micIconEl;
    #isEnabled;

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });
        this.#isEnabled = false;

        this.toogleMicHandler = this.toogleMicHandler.bind(this);
    }

    connectedCallback() {
        this.#root.appendChild(template.content.cloneNode(true));
        this.#btnEl = this.#root.querySelector('wired-icon-button');
        this.#micIconEl = this.#root.querySelector('mwc-icon');

        this.#btnEl.addEventListener('click', this.toogleMicHandler);
    }

    toogleMicHandler() {
        let icon;

        if (this.#isEnabled) {
            audio.stopRecordingAudio();
            this.#isEnabled = false;
            icon = 'mic_off';
        } else {
            audio.startRecordingAudio();
            this.#isEnabled = true;
            icon = 'mic';
        }

        this.#btnEl.classList.toggle('red');
        this.#micIconEl.innerText = icon;
    }
}

export default MicBtn;
