import debounce from 'debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function searchCountry(e) {
    const countryToFind = e.target.value.toLowerCase().trim()

    if (!countryToFind) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(countryToFind).then(countries => {
        console.log(countries)

        // if (countries.status === 404) {
        //     countryList.innerHTML = ''
        //     return [];
        // }

        if (!Array.isArray(countries)) {
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            Notiflix.Notify.failure('No countries found.');
            return;
        }

        if (countries.length >= 10) {
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return;
        }

        if (countries.length === 1) {
            countryList.innerHTML = ""
              countryInfo.innerHTML = countries.map(({ name: { official }, capital, 
              population, flags: {svg}, languages}) => 
              `<div style="display: flex; align-items: center; gap: 16px;">
              <img width="70" height="50" src="${svg}" alt="${official} flag"/><h2 style="margin: 0">${official}</h2>
              </div>
                <p style="margin: 0">Capital: ${capital}</p>
                <p style="margin: 0">Population: ${population}</p>
                <p style="margin: 0">Languages: ${Object.values(languages).join(', ')}</p>`)
            return;
        }
  
         if (countries.length !== 0) {
            countryInfo.innerHTML = ""

            const countriesMarkup = countries.map(({ name: { official }, flag,  flags: { svg }}) => 
                `<li style="display: flex; gap: 10px;">
                    <img width="30" height="20" src="${svg}" alt="${official} flag"/>
                    <span>${official}</span>
                </li>`
            ).join('')
        
            countryList.innerHTML = countriesMarkup
         }
    }).catch(error => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.failure('Error fetching data. Please try again later.');
        console.error(error);
    });;
}

searchInput.addEventListener('input', debounce(searchCountry, 300))
