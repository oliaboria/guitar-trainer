import Vex from 'vexflow';

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
        return this.getAttribute('note');
    }

    get #octave() {
        return this.getAttribute('octave');
    }

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.#containerEl = document.createElement('div');

        this.#root.appendChild(this.#containerEl);

        this.#renderer = new VF.Renderer(
            this.#containerEl,
            VF.Renderer.Backends.SVG,
        );
        this.#renderer.resize(300, 300);

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
        this.#rendererContext.clear();
        this.#stave.draw();

        this.render();
    }

    render() {
        const staveNote = new VF.StaveNote({
            keys: [`${this.#note}/${this.#octave}`],
            duration: 'w',
        });

        if (this.#note.includes('#')) {
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
