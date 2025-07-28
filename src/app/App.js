import Header from '../view/components/header';
import { loadWeatherForLocation } from './weather-controller';
import { loadWeatherForLocations } from './location-controller';

const dummyLocations = [
    'Auckland, NZ',
    'Sydney, AU',
    'London, UK',
    'New York, US',
];

export function initializeWeatherApp() {    
    renderHeader();
    loadWeatherForLocation(dummyLocations[0]); // Load weather for the default location
}

function renderHeader() {
    const headerElement = Header();
    document.body.insertBefore(headerElement, document.body.firstChild);

    addHeaderEventListeners();

    function addHeaderEventListeners() {
        const reloadLocationBtn = headerElement.querySelector('.reload-location');
        const locationListBtn = headerElement.querySelector('.location-list-btn');

        if (reloadLocationBtn) {
            reloadLocationBtn.addEventListener('click', () => {
                // Placeholder for future functionality
                console.log('Reload location button clicked');
                loadWeatherForLocation(dummyLocations[0]);
            });
        }

        if (locationListBtn) {
            locationListBtn.addEventListener('click', () => {
                // Placeholder for future functionality
                loadWeatherForLocations(dummyLocations);
                console.log('Location list button clicked');
            });
        }
    }
}

