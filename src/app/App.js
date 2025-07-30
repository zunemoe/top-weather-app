import Header from '../view/components/header';
import { loadWeatherForLocation } from './weather-controller';
import { loadWeatherForLocations } from './location-controller';

const dummyLocations = [
    'Auckland',
    'Sydney',
    'London',
    'New York'
];

export function initializeWeatherApp() {    
    renderHeader();
    loadWeatherForLocation(dummyLocations[0]); // Load weather for the default location
}

export function renderHeader() {
    const headerElement = document.querySelector('header');
    if (headerElement.classList.contains('weather-header')) {
        renderLocationListHeader();
    } else if (headerElement.classList.contains('location-list-header')) {
        renderWeatherHeader();
    } else {
        renderWeatherHeader();
    }   
}

function renderWeatherHeader() {
    const headerElement = Header('weather', {
        onReload: () => loadWeatherForLocation(dummyLocations[0]),
        onLocationList: () => loadWeatherForLocations(dummyLocations)
    });

    const currentHeaderElement = document.querySelector('header');
    if (currentHeaderElement) {
        currentHeaderElement.replaceWith(headerElement);
    } else {
        document.body.insertBefore(headerElement, document.body.firstChild);
    }
}

function renderLocationListHeader() {
    const headerElement = Header('locations', {
        onRefresh: () => loadWeatherForLocations(dummyLocations),
        onClose: () => console.log('Close location list')
    });

    const currentHeaderElement = document.querySelector('header');
    if (currentHeaderElement) {
        currentHeaderElement.replaceWith(headerElement);
    } else {
        document.body.insertBefore(headerElement, document.body.firstChild);
    }
}

// function renderHeader() {
//     const headerElement = Header();
//     document.body.insertBefore(headerElement, document.body.firstChild);

//     addHeaderEventListeners();

//     function addHeaderEventListeners() {
//         const reloadLocationBtn = headerElement.querySelector('.reload-location');
//         const locationListBtn = headerElement.querySelector('.location-list-btn');

//         if (reloadLocationBtn) {
//             reloadLocationBtn.addEventListener('click', () => {
//                 // Placeholder for future functionality
//                 console.log('Reload location button clicked');
//                 loadWeatherForLocation(dummyLocations[0]);
//             });
//         }

//         if (locationListBtn) {
//             locationListBtn.addEventListener('click', () => {
//                 // Placeholder for future functionality
//                 loadWeatherForLocations(dummyLocations);
//                 console.log('Location list button clicked');
//             });
//         }
//     }
// }

