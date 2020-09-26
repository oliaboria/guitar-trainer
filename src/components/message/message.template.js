const template = document.createElement('template');

template.innerHTML = `
    <style>
        wired-card {
            margin: 0 auto;
            width: 200px;
            display: block;
        }

        .content {
            text-align: center;
        }

        .hidden {
            display: none;
        }
    </style>
    <wired-card>
        <div class="content"></div>
    </wired-card>
`;

export default template;
