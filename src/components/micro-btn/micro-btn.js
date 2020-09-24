import { PitchDetector } from 'pitchy';

import audio from '../../utils/audio';
import detectNote from '../../utils/detectNote';

class MicroBtn extends HTMLElement {
    #root;
    #btnEl;
    #isEnabled;

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });
        this.#isEnabled = false;
    }

    connectedCallback() {
        this.#btnEl = document.createElement('button');
        this.#btnEl.innerText = 'Microphone';

        this.#root.appendChild(this.#btnEl);

        this.#btnEl.addEventListener('click', () => {
            if (this.#isEnabled) {
                audio.stopRecordingAudio();
                this.#isEnabled = false;
            } else {
                audio.startRecordingAudio();
                this.#isEnabled = true;
            }
        });
    }
}

export default MicroBtn;
