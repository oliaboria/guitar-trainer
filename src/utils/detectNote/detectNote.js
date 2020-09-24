const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NUMBER_OF_NOTES = NOTES.length;

const c0 = 440.0 * 2 ** -4.75;

const detectNote = (frequency) => {
    if (!frequency) return null;

    const halfStepsBelowMiddleC = Math.round(12.0 * Math.log2(frequency / c0));
    const octave = Math.floor(halfStepsBelowMiddleC / NUMBER_OF_NOTES);
    const key = NOTES[Math.floor(halfStepsBelowMiddleC % NUMBER_OF_NOTES)];

    return { key, octave };
};

export default detectNote;
