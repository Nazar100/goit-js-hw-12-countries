import markupTemplatesOne from '../templates/countries-markup.hbs';
import markupTemplatesMany from '../templates/variants.hbs';
import debounce from 'lodash.debounce';
import callAlert from './notification';

const inputRef = document.querySelector('.input');
const containerRef = document.querySelector('.container');

inputRef.addEventListener('input', debounce(fetchCountries, 500));

function fetchCountries(e) {
  const answer = e.target.value;
  fetch(
    `https://restcountries.eu/rest/v2/name/${answer}?fields=name;capital;languages;population;flag`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      checkNumberOfCntrs(data);
    });
}

function checkNumberOfCntrs(data) {
  if (data.length === 1) {
    const markupOne = markupTemplatesOne(data[0]);
    insertMarkup(markupOne);
  } else if (data.length > 1 && data.length <= 10) {
    const markupMany = markupTemplatesMany(data);
    insertMarkup(markupMany);
  } else {
    callAlert();
  }
}

function insertMarkup(markup) {
  containerRef.innerHTML = markup;
}
