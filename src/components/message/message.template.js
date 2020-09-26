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
    </style>
    <div>
        <wired-card>
            <div class="content"></div>
        </wired-card>
    </div>
`;

export default template;
