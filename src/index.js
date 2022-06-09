import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryList: document.querySelector('.country-list'),
  input: document.querySelector('#search-box'),
};

refs.input.addEventListener('input', debounce(onSearchName, DEBOUNCE_DELAY));

function onSearchName() {
  const currentName = refs.input.value;
  const currentNameTrim = currentName.trim();

  if (currentNameTrim === '') {
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(currentNameTrim)
    .then(renderCountryCard)
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryCard(country) {
  let markup = '';

  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (country.length >= 2 && country.length <= 10) {
    console.log('object');
    markup = country
      .map(({ name, flags }) => {
        return `
     <div class="list">
       <h2 class="country__name"><img class="coutry__image" src=${flags.svg} width="25">${name.official}</h2>
     </div>`;
      })
      .join('');
  } else {
    markup = country
      .map(({ name, capital, population, flags, languages }) => {
        return `
       <div class="list-first">
         <h2 class="country-first__name"><img class="coutry__image" src=${
           flags.svg
         } width="25">${name.official}</h2>
         <p class="country__text"><span class="text">Capital: </span>${capital}</p>
         <p class="country__text"><span class="text">Population: </span>${population}</p>
         <p class="country__text"><span class="text">Languages: </span>${Object.values(
           languages
         )}</p>
       </div>`;
      })
      .join('');
  }

  refs.countryList.innerHTML = markup;
  return markup;
}
