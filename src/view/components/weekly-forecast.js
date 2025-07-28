import { getWeatherIcon } from '../../app/utility';

export default function weeklyForecast(week) {
    const container = document.createElement('div');
    container.classList.add('weekly-forecast-container');

    const card = document.createElement('div');
    card.classList.add('weekly-forecast-card');
    container.appendChild(card);

    const header = document.createElement('div');
    header.classList.add('weekly-forecast-header');
    header.innerHTML = `
        <span class="material-symbols-outlined">calendar_month</span>
        <p>10-DAY FORECAST</p>
        `;    
    card.appendChild(header);

    week.forEach(day => {
        const dayBlock = document.createElement('div');
        dayBlock.classList.add('day-block');

        dayBlock.innerHTML = `
            <p class="date">${day.date}</p>
            <div>
                <img src="${getWeatherIcon(day.icon)}" alt="${day.condition}" class="day-icon">
                <span class="precipitation">${day.precipitation || ''}</span>
            </div>
            
            <p class="temperature">L:${day.tempLow}°C / H:${day.tempHigh}°C</p>
        `;

        card.appendChild(dayBlock);
    });

    return container;
}