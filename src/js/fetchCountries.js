export function fetchCountries(country) {
   return fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,flag,capital,population,flags,languages`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Country not found: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching countries:', error);
        return [];
    })
}