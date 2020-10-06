import { defaultModules, alert } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';

function callAlert() {
  alert({
    text: 'Нужно более точное название',
    type: 'error',
    width: '300px',
    height: '100px',
    animation: 'smooth',

    hide: true,
    delay: 200000,
  });
}
export default callAlert;
