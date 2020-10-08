import markupTemplatesOne from '../templates/countries-markup.hbs';
import markupTemplatesMany from '../templates/variants.hbs';
import debounce from 'lodash.debounce';
import callAlert from './notification';
const axios = require('axios').default;

const inputRef = document.querySelector('.input');
const containerRef = document.querySelector('.container');

inputRef.addEventListener('input', debounce(fetchCountries, 500));

function fetchCountries({ target }) {
  const answer = target.value;
  axios
    .get(
      `https://restcountries.eu/rest/v2/name/${answer}?fields=name;capital;languages;population;flag`,
    )
    .then(response => {
      return response;
    })
    .then(({ data }) => {
      checkNumberOfCntrs(data);
    })
    .finally(() => {
      clearSpace();
    });
}

function checkNumberOfCntrs(data) {
  if (data.length === 1) {
    const markupOne = markupTemplatesOne(data[0]);
    insertMarkup(markupOne);
  } else if (data.length > 1 && data.length <= 10) {
    const markupMany = markupTemplatesMany(data);
    insertMarkup(markupMany);
    chooseCountry(data);
  } else if (data.length > 10) {
    callAlert();
  }
}

function insertMarkup(markup) {
  containerRef.innerHTML = markup;
}

function chooseCountry(data) {
  const listRef = document.querySelector('ul');
  listRef.addEventListener('click', ({ target }) => {
    const country = target.textContent;
    data.forEach(res => {
      if (res.name === country) {
        const markup = markupTemplatesOne(res);
        insertMarkup(markup);
      }
    });
  });
}
function clearSpace() {
  if (inputRef.value === '') {
    containerRef.innerHTML = '';
  }
}
