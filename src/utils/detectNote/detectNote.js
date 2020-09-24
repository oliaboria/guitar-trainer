const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NUMBER_OF_NOTES = NOTES.length;

// Base note
const A4_FREQUENCY = 440.0;
const C0 = A4_FREQUENCY * 2 ** -4.75;

/*
 *Use this formula to detect a note from frequency
 * https://www.johndcook.com/blog/2016/02/10/musical-pitch-notation/
 */
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
