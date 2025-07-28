import { getWeatherIcon } from '../../app/utility';

export default function hourlyForecast(hours) {
    const container = document.createElement('div');
    container.classList.add('hourly-forecast-container');
    const card = document.createElement('div');
    card.classList.add('hourly-forecast-card');
    container.appendChild(card);

    hours.forEach(hour => {
        const hourBlock = document.createElement('div');
        hourBlock.classList.add('hour-block');

        hourBlock.innerHTML = `
            <p class="time">${hour.time.split(':')[0]}</p>
            <div>
            <img src="${getWeatherIcon(hour.icon)}" alt="${hour.condition}" class="hour-icon">
            <span class="precipitation">${hour.precipitation || ''}</span>
            </div>
            
            <p class="temperature">${hour.temperature}°</p>
        `;

        card.appendChild(hourBlock);
    });
        
    return container;
}