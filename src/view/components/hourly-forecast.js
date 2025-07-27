import { getWeatherIcon } from '../../app/utility';

export default function hourlyForecast(hours) {
    const card = document.createElement('div');
    card.classList.add('hourly-forecast-card');

    hours.forEach(hour => {
        const hourBlock = document.createElement('div');
        hourBlock.classList.add('hour-block');

        hourBlock.innerHTML = `
            <p class="time">${hour.time}</p>
            <img src="${getWeatherIcon(hour.icon)}" alt="${hour.condition}" class="hour-icon">
            <span class="precipitation">${hour.precipitation || ''}</span>
            <p class="temperature">${hour.temperature}°C</p>
        `;

        card.appendChild(hourBlock);
    });
        
    return card;
}