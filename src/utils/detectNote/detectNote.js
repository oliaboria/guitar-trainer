const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NUMBER_OF_NOTES = NOTES.length;

const C0 = 440.0 * 2 ** -4.75;

const detectNote = (frequency) => {
    if (!frequency) return null;

    const noteFromBaseC = Math.round(
        NUMBER_OF_NOTES * Math.log2(frequency / C0),
    );
    const octave = Math.floor(noteFromBaseC / NUMBER_OF_NOTES);
    const key = NOTES[Math.floor(noteFromBaseC % NUMBER_OF_NOTES)];

    return { key, octave };
};

export default detectNote;
