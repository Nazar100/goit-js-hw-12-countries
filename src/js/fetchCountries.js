import markupTemplatesOne from '../templates/countries-markup.hbs';
import markupTemplatesMany from '../templates/variants.hbs';
import debounce from 'lodash.debounce';
import callAlert from './notification';

const inputRef = document.querySelector('.input');
const containerRef = document.querySelector('.container');
const mainRef = document.querySelector('main');

inputRef.addEventListener('input', debounce(fetchCountries, 500));

function fetchCountries({ target }) {
  const answer = target.value;
  fetch(
    `https://restcountries.eu/rest/v2/name/${answer}?fields=name;capital;languages;population;flag`,
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      checkNumberOfCntrs(data);
      // mainRef.addEventListener('click', clearSpace);
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
  } else {
    callAlert();
  }
}

function insertMarkup(markup) {
  containerRef.innerHTML = markup;
}
// function clearSpace({ target }) {
//   const itemRef = document.querySelector('.item');
//   console.log(target, itemRef);
//   if (target !== itemRef) {
//     containerRef.innerHTML = '';
//   }
// }
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
