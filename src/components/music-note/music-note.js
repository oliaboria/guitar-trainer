import Vex from 'vexflow';

import template from './music-note.template';

const VF = Vex.Flow;

class MusicNote extends HTMLElement {
    #root;
    #containerEl;
    #renderer;
    #rendererContext;
    #stave;

    static get observedAttributes() {
        return ['note'];
    }

    get #note() {
        return JSON.parse(this.getAttribute('note'));
    }

    get #shift() {
        return +this.getAttribute('shift');
    }

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.#root.appendChild(template.content.cloneNode(true));
        this.#containerEl = this.#root.querySelector('.note-wrapper');

        this.#renderer = new VF.Renderer(
            this.#containerEl,
            VF.Renderer.Backends.SVG,
        );
        this.#renderer.resize(150, 210);

        this.#rendererContext = this.#renderer.getContext();
        this.#rendererContext
            .setFont('Arial', 10, '')
            .setBackgroundFillStyle('#eed');

        // Create a this.#stave of width 100 at position 10, 40 on the canvas
        this.#stave = new VF.Stave(10, 40, 100);

        // Add a clef
        this.#stave.addClef('treble');

        // Connect it to the rendering context and draw
        this.#stave.setContext(this.#rendererContext).draw();

        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        if (this.#rendererContext) {
            this.#rendererContext.clear();
            this.#stave.draw();
        }

        const { key, octave } = this.#note;

        const staveNote = new VF.StaveNote({
            keys: [`${key}/${octave + this.#shift}`],
            duration: 'w',
        });

        if (key.includes('#')) {
            staveNote.addAccidental(0, new VF.Accidental('#'));
        }

        const voice = new VF.Voice({ num_beats: 1, beat_value: 1 });
        voice.addTickables([staveNote]);

        const formatter = new VF.Formatter()
            .joinVoices([voice])
            .format([voice], 100);

        voice.draw(this.#rendererContext, this.#stave);
    }
}

export default MusicNote;
