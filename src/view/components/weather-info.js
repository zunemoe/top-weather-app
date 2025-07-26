export default function currentWeatherCard(data) {
    const card = document.createElement('div');
    card.classList.add('current-weather-card');

    const icon = document.createElement('div');
    icon.classList.add('weather-icon');
    icon.innerHTML = `
        <span class="material-symbols-outlined">sunny</span>
    `;

    const info = document.createElement('div');
    info.classList.add('weather-info');
    const location = document.createElement('div');
    location.classList.add('location');
    location.textContent = 'Auckland, NZ';
    const temperature = document.createElement('div');
    temperature.classList.add('temperature');
    temperature.textContent = '20°C';
    const condition = document.createElement('div');
    condition.classList.add('condition');
    condition.textContent = 'Sunny';
    const temperatureRange = document.createElement('div');
    temperatureRange.classList.add('temperature-range');
    temperatureRange.textContent = '18°C - 22°C';

    info.appendChild(location);
    info.appendChild(temperature);
    info.appendChild(condition);
    info.appendChild(temperatureRange);
    card.appendChild(icon);
    card.appendChild(info);

    return card;
}