import { getWeatherData } from '../services/weather-api';
import { weatherData } from '../modal/weather-data';
import { fetchWeatherData } from '../services/weather-api';
import HomePage from '../view/pages/home-page';

export async function loadWeatherForLocation(location) {
    try {
        // Fetch weather data
        const apiData = await fetchWeatherData(location, 'metric');
        console.log('API Data:', apiData); // Debugging line to check API data
        
        // Transform API data        
        const weatherDataObject = weatherData(apiData);
        console.log('API Formatted Data:', weatherDataObject);

        // Render the home page with the fetched weather data
        renderHomePage(weatherDataObject);        
    } catch (error) {
        console.error('Error loading weather for location:', error);
        throw error;
    }
}

function renderHomePage(weatherData) {
    const homePageElement = HomePage(weatherData);
    const app = document.getElementById('app');
    
    app.appendChild(homePageElement);
}