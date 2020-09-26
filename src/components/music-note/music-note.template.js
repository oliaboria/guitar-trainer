const template = document.createElement('template');

template.innerHTML = `
    <style>
        wired-card {
            margin: 0 auto;
            width: 400px;
            display: block;
        }

        .note-wrapper {
            display: flex;
            justify-content: center;
        }
    </style>
    <div>
        <wired-card elevation="5">
            <div class="note-wrapper"></div>
        </wired-card>
    </div>
`;

export default template;
