import { defaultModules, alert } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';

function callAlert() {
  alert({
    text: 'Too many matches. Be more specific',
    type: 'error',
    width: '300px',
    height: '100px',
    animation: 'fade',
    animateSpeed: 'normal',
    hide: true,
    delay: 2000,
  });
}
export default callAlert;
