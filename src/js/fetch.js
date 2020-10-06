import { error, alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import * as PNotifyAnimate from '@pnotify/animate';

const myError = error({
  text: "I'm an error message.",
  width: '300px',
  animation: 'fade',
  animateSpeed: '8000ms',
  hide: true,
  delay: 900,
  dir1: 'down',
  dir2: 'left',
  firstpos1: 100,
  firstpos2: 25,
  spacing1: 200,
  spacing2: 36,
});

import markupTemplatesOne from '../templates/countries-markup.hbs';
import markupTemplatesMany from '../templates/variants.hbs';
import debounce from 'lodash.debounce';

const inputRef = document.querySelector('.input');
const containerRef = document.querySelector('.container');

inputRef.addEventListener('input', debounce(handleAnswer, 250));

function handleAnswer(e) {
  const answer = e.target.value;
  fetch(
    `https://restcountries.eu/rest/v2/name/${answer}?fields=name;capital;languages;population;flag`,
  )
    .then(response => {
      return response.json();
    })
    .then(res => {
      const markupOne = markupTemplatesOne(res[0]);
      const markupMany = markupTemplatesMany(res);

      checkNumberOfCntrs(markupOne, res, markupMany);
    })
    .catch(error => {
      console.log(error);
    });
}

function checkNumberOfCntrs(markupOne, res, markupMany) {
  if (res.length === 1) {
    insertMarkup(markupOne);
  } else if (res.length > 1 && res.length <= 10) {
    insertMarkup(markupMany);
  } else if (res.length > 10) {
    console.log('нужно больше');
  }
}

function insertMarkup(markup) {
  containerRef.innerHTML = markup;
}
