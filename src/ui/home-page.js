import CurrentWeatherCard from '../app/components/current-weather-card';

export function renderHomePage() {
    const container = document.createElement('div');
    container.classList.add('home-page');

    container.appendChild(CurrentWeatherCard());
    return container;
}