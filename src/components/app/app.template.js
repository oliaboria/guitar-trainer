const template = document.createElement('template');

template.innerHTML = `
    <style>
        .btn-container {
            width: 300px;
            margin: 0 auto;
        }
    </style>
    <music-note></music-note>
    <div class="btn-container">
        <mic-btn></mic-btn>
        <button class="next-note-btn" type="button">Next note</button>
    </div>
    <result-message></result-message>
`;

export default template;
