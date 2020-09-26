const template = document.createElement('template');

template.innerHTML = `
    <style>

        .container {
            width: 100%;
            margin: 0 auto;
        }

        @media (min-width: 500px) {
            .container {
                max-width: 400px;
            }
        }

        .btn-container {
            margin-bottom: 30px;
        }

        .btn-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    </style>
    <div class="container">
        <music-note></music-note>
        <div class="btn-container">
            <div class="btn-wrapper">
                <mic-btn></mic-btn>
                <wired-button elevation="2" class="next-note-btn">Next note</wired-button>
            </div>
        </div>
        <result-message></result-message>
    </div>
`;

export default template;
