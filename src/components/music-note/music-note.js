import Vex from 'vexflow';

const VF = Vex.Flow;

class MusicNote extends HTMLElement {
    #root;
    #containerEl;

    static get observedAttributes() {
        return ['note'];
    }

    get #note() {
        return this.getAttribute('note');
    }

    constructor() {
        super();
        this.#root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.#containerEl = document.createElement('div');

        this.#root.appendChild(this.#containerEl);

        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const renderer = new VF.Renderer(
            this.#containerEl,
            VF.Renderer.Backends.SVG,
        );
        renderer.resize(300, 300);

        const context = renderer.getContext();
        context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');

        // Create a stave of width 100 at position 10, 40 on the canvas
        const stave = new VF.Stave(10, 40, 100);

        // Add a clef
        stave.addClef('treble');

        // Connect it to the rendering context and draw
        stave.setContext(context).draw();

        const notes = [
            new VF.StaveNote({ keys: [`${this.#note}/4`], duration: 'w' }),
        ];

        const voice = new VF.Voice({ num_beats: 1, beat_value: 1 });
        voice.addTickables(notes);

        const formatter = new VF.Formatter()
            .joinVoices([voice])
            .format([voice], 100);

        voice.draw(context, stave);
    }
}

export default MusicNote;
