const template = document.createElement('template');

template.innerHTML = `
    <music-note note="g"></music-note>
    <mic-btn></mic-btn>
    <result-message></result-message>
    <button class="next-note-btn" type="button">Next note</button>
`;

export default template;
