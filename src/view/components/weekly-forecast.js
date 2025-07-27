import { getWeatherIcon } from '../../app/utility';

export default function weeklyForecast(week) {
    const card = document.createElement('div');
    card.classList.add('weekly-forecast-card');

    const header = document.createElement('div');
    header.classList.add('weekly-forecast-header');
    header.innerHTML = '<h2>10-DAY FORECAST</h2>';    
    card.appendChild(header);

    week.forEach(day => {
        const dayBlock = document.createElement('div');
        dayBlock.classList.add('day-block');

        dayBlock.innerHTML = `
            <p class="date">${day.date}</p>
            <img src="${getWeatherIcon(day.icon)}" alt="${day.condition}" class="day-icon">
            <span class="precipitation">${day.precipitation || ''}</span>
            <p class="temperature">L:${day.tempLow}°C / H:${day.tempHigh}°C</p>
        `;

        card.appendChild(dayBlock);
    });

    return card;
}