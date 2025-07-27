import Header from '../view/components/header';
import { loadWeatherForLocation } from './weather-controller';

export function initializeWeatherApp() {
    const defaultLocation = 'Auckland, NZ'; // Default location for the app
    renderHeader();
    loadWeatherForLocation(defaultLocation);
}

function renderHeader() {
    const headerElement = Header();
    document.body.insertBefore(headerElement, document.body.firstChild);
}

