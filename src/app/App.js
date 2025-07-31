import Header from '../view/components/header';
import { loadWeatherForLocation } from './weather-controller';
import { loadWeatherForLocations } from './location-controller';
import { getCurrentLocation, getLocationList, saveCurrentLocation } from './storage';   

export function initializeWeatherApp() {    
    renderHeader();
    loadWeatherForLocation(getCurrentLocation()); // Load weather for the default location
    renderFooter();
}

export function hideHomeAndShowLocationList() {
    console.log('Hiding home page and showing location list');
    const homePage = document.querySelector('.home-page');
    const locationListPage = document.querySelector('.location-list-page');

    if (homePage) homePage.classList.add('hidden');
    if (locationListPage) locationListPage.classList.remove('hidden');
}

export function showHomeAndHideLocationList() {
    console.log('Showing home page and hiding location list');
    const homePage = document.querySelector('.home-page');
    const locationListPage = document.querySelector('.location-list-page');
    if (homePage) homePage.classList.remove('hidden');
    if (locationListPage) locationListPage.classList.add('hidden');
}

export function renderHeader() {
    const headerElement = document.querySelector('header');
    if (!headerElement) {
        renderWeatherHeader();
    } else {
        if (headerElement.classList.contains('weather-header')) {
            renderLocationListHeader();
        } else if (headerElement.classList.contains('location-list-header')) {
            renderWeatherHeader();
        }
    }
}

function renderWeatherHeader() {
    const headerElement = Header('weather', {
        onReload: () => loadWeatherForLocation(getCurrentLocation()),
        onLocationList: async () => {
            await loadWeatherForLocations(getLocationList());   
            console.log('Show location list');
            hideHomeAndShowLocationList();  
            renderHeader();       
    }});

    const currentHeaderElement = document.querySelector('header');
    if (currentHeaderElement) {
        currentHeaderElement.replaceWith(headerElement);
    } else {
        document.body.insertBefore(headerElement, document.body.firstChild);
    }
}

function renderLocationListHeader() {
    const headerElement = Header('locations', {
        onRefresh: () => loadWeatherForLocations(getLocationList()),
        onClose: () => {
            showHomeAndHideLocationList();
            renderHeader();
        }
    });

    const currentHeaderElement = document.querySelector('header');
    if (currentHeaderElement) {
        currentHeaderElement.replaceWith(headerElement);
    } else {
        document.body.insertBefore(headerElement, document.body.firstChild);
    }
}

function renderFooter() {
    const footerElement = document.querySelector('footer');
    footerElement.innerHTML = `&copy; ${new Date().getFullYear()} Weather App. Made with ❤️ by zunemoe in Auckland.`;
}
