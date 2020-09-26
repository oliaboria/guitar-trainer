import 'wired-elements/lib/wired-elements-iife';

import App from './components/app';
import Message from './components/message';
import MicBtn from './components/mic-btn';
import MusicNote from './components/music-note';

window.customElements.define('music-app', App);
window.customElements.define('result-message', Message);
window.customElements.define('music-note', MusicNote);
window.customElements.define('mic-btn', MicBtn);
