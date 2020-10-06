import markupTemplatesOne from '../templates/countries-markup.hbs';
import markupTemplatesMany from '../templates/variants.hbs';
import debounce from 'lodash.debounce';
import callAlert from './notification';

const inputRef = document.querySelector('.input');
const containerRef = document.querySelector('.container');
inputRef.addEventListener('input', debounce(handleAnswer, 350));

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
    callAlert();
    console.log('asd');
  }
}

function insertMarkup(markup) {
  containerRef.innerHTML = markup;
}
