import LocationListPage from '../view/pages/location-list-page';
import { locationData } from '../modal/location-data';
import { fetchLocationData } from '../services/location-api';

export async function loadWeatherForLocations(locations = []) {
    try {
        // Fetch weather data for each location

        // Transform API data

        // Render the location list page with the fetched data
        renderLocationListPage(locations);
    } catch (error) {
        console.error('Error loading weather for locations:', error);
        throw error;
    }

   function renderLocationListPage(locations = [], weatherData = {}) {
        const locationListPageElement = LocationListPage(locations, weatherData);
        const app = document.getElementById('app');

        app.innerHTML = '';
        app.appendChild(locationListPageElement);
    } 
}

export async function searchLocation(keyword) {
    try {
        // Fetch location data based on the keyword
        const apiData = await fetchLocationData(keyword);
        console.log('Location API Data:', apiData);

        // Transform API data
        // const locationDataObject = {

        // }
    } catch (error) {
        console.error('Error searching for location:', error);
        throw error;
    }
}