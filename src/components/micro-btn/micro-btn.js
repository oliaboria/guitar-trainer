import { PitchDetector } from 'pitchy';

import detectNote from '../../utils/detectNote';

class MicroBtn extends HTMLElement {
    #root;
    #btnEl;
    #isEnabled;
    audioContext;
    analyserNode;
    #userMedia;

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });
        this.#isEnabled = false;
    }

    connectedCallback() {
        this.#btnEl = document.createElement('button');
        this.#btnEl.innerText = 'Microphone';

        this.#root.appendChild(this.#btnEl);

        this.#userMedia = navigator.mediaDevices.getUserMedia({ audio: true });

        this.#btnEl.addEventListener('click', () => {
            if (this.#isEnabled) {
                this.audioContext.close();
                this.#isEnabled = false;
            } else {
                this.audioContext = new (window.AudioContext ||
                    window.webkitAudioContext)();
                this.analyserNode = this.audioContext.createAnalyser();

                this.#userMedia.then((stream) => {
                    this.#isEnabled = true;
                    const sourceNode = this.audioContext.createMediaStreamSource(
                        stream,
                    );
                    sourceNode.connect(this.analyserNode);
                    setTimeout(() => {
                        const detector = PitchDetector.forFloat32Array(
                            this.analyserNode.fftSize,
                        );
                        const input = new Float32Array(detector.inputLength);
                        const { sampleRate } = this.audioContext;

                        this.analyserNode.getFloatTimeDomainData(input);

                        const [pitch, clarity] = detector.findPitch(
                            input,
                            sampleRate,
                        );

                        console.log(pitch);
                        console.log(detectNote(pitch));
                    }, 1000);
                });
            }
        });
    }
}

export default MicroBtn;
