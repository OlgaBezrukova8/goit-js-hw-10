import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  countryList: document.querySelector('.country-list'),
  input: document.querySelector('#search-box'),
};

refs.input.addEventListener('input', debounce(onSearchName, DEBOUNCE_DELAY));

function onSearchName() {
  const currentName = refs.input.value;

  fetchCountries(currentName)
    .then(renderCountryCard)
    .catch(error => console.log(error));
}

function renderCountryCard(country) {
  const test = country
    .map(({ name, capital, population, flags, languages }) => {
      return `
       <li class="list">
         <h2 class="country__name"><img class="coutry__image" src=${
           flags.svg
         } width="25">${name.official}</h2>
         <p class="counrty__capital">Capital: ${capital}</p>
         <p class="counrty__population">Population: ${population}</p>
         <p class="counrty__languages">Languages: ${Object.values(
           languages
         )}</p>
       </li>`;
    })
    .join('');

  refs.countryList.innerHTML = test;
  return test;
}
