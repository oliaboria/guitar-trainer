# guitar-trainer

This package contains web-application "guitar trainer":
- app shows music note
- user should play this sound on the guitar
- app checked whether it was correct (Web Audio API) sound and shows either the success or mistake message.

You can check it on GH pages:

## Installation

```bash
npm install
npm start
```

The app is available on `http://localhost:3000/`

## Usage

This app supports 2 modes: piano and guitar (since guitar has one octave offset in musical part).
The default is piano.

In order to run guitar mode, use `mode` query parameter:
```
http://localhost:3000/?mode=guitar
```
