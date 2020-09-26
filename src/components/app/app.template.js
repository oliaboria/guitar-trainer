const template = document.createElement('template');

template.innerHTML = `
    <style>
        .btn-container {
            width: 400px;
            margin: 0 auto;
            margin-bottom: 30px;
        }

        .btn-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    </style>
    <music-note></music-note>
    <div class="btn-container">
        <div class="btn-wrapper">
            <mic-btn></mic-btn>
            <wired-button elevation="2" class="next-note-btn">Next note</wired-button>
        </div>
    </div>
    <result-message></result-message>
`;

export default template;
