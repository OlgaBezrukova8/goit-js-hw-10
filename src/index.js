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

  fetchCountries(currentNameTrim)
    .then(renderCountryCard)
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });

  if (currentNameTrim === '') {
    refs.countryList.innerHTML = '';
  }
}

function renderCountryCard(country) {
  const markup = country
    .map(({ name, capital, population, flags, languages }) => {
      return `
       <div class="list">
         <h2 class="country__name"><img class="coutry__image" src=${
           flags.svg
         } width="25">${name.official}</h2>
         <p class="country__text country__capital"><span class="text">Capital: </span>${capital}</p>
         <p class="country__text country__population"><span class="text">Population: </span>${population}</p>
         <p class="country__text country__languages"><span class="text">Languages: </span>${Object.values(
           languages
         )}</p>
       </div>`;
    })
    .join('');

  refs.countryList.innerHTML = markup;
  return markup;
}
