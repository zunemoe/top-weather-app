import CurrentWeatherCard from '../components/weather-info';

export function renderHomePage() {
    const container = document.createElement('div');
    container.classList.add('home-page');

    container.appendChild(CurrentWeatherCard());
    return container;
}