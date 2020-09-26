import { PitchDetector } from 'pitchy';

import detectNote from '../detectNote';
import eventEmitter from '../eventEmitter';

class Audio {
    #bufferSize;
    #isInitialized;
    #audioContext;
    #analyserNode;
    #userMedia;
    #scriptProcessor;

    constructor() {
        this.#bufferSize = 2048;
        this.#isInitialized = false;
        this.#userMedia = navigator.mediaDevices.getUserMedia({ audio: true });

        this.audioProcessHandler = this.audioProcessHandler.bind(this);
    }

    #findPitch(input) {
        const { sampleRate } = this.#audioContext;
        const detector = PitchDetector.forFloat32Array(
            this.#analyserNode.fftSize,
        );

        this.#analyserNode.getFloatTimeDomainData(input);
        const [pitch, clarity] = detector.findPitch(input, sampleRate);

        return { pitch, clarity };
    }

    #detectNote(pitchConfig) {
        return detectNote(pitchConfig);
    }

    #initialize() {
        this.#audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();

        this.#analyserNode = this.#audioContext.createAnalyser();
        this.#scriptProcessor = this.#audioContext.createScriptProcessor(
            this.#bufferSize,
            1,
            1,
        );

        this.#scriptProcessor.addEventListener(
            'audioprocess',
            this.audioProcessHandler,
        );

        this.#isInitialized = true;
    }

    startRecordingAudio() {
        if (!this.#isInitialized) this.#initialize();

        this.#userMedia.then((stream) => {
            this.#audioContext.resume();

            const sourceNode = this.#audioContext.createMediaStreamSource(
                stream,
            );
            sourceNode.connect(this.#analyserNode);
            this.#analyserNode.connect(this.#scriptProcessor);
            this.#scriptProcessor.connect(this.#audioContext.destination);
        });
    }

    stopRecordingAudio() {
        this.#audioContext.suspend();
    }

    audioProcessHandler(event) {
        const pitchConfig = this.#findPitch(
            event.inputBuffer.getChannelData(0),
        );
        const note = this.#detectNote(pitchConfig);

        if (note) {
            eventEmitter.emit('noteDetected', note);
        }
    }
}

const audio = new Audio();

export default audio;
