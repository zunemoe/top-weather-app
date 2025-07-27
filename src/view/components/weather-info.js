//humidity
// 0-30 -> Low -> <span class="material-symbols-outlined">humidity_low</span>
// 31-70 -> Moderate -> <span class="material-symbols-outlined">humidity_mid</span>
// 71-100 -> High -> <span class="material-symbols-outlined">humidity_high</span>
//windSpeed
//<span class="material-symbols-outlined">air</span>
//feelsLike
//<span class="material-symbols-outlined">thermostat</span>

import { getWeatherIcon } from '../../app/utility';

export default function weatherInfo(data) {
    const card = document.createElement('div');
    card.classList.add('weather-info-card');

    const humidityIcon = data.humidity <= 30 ? 'humidity_low' :
        data.humidity <= 70 ? 'humidity_mid' : 'humidity_high';
    const weatherIcon = getWeatherIcon(data.icon);
    card.innerHTML = `
        <div class="temp-info">
            <h2 class="location">${data.location}</h2>
            <img src="${weatherIcon}" alt="${data.condition}" class="weather-icon">
            <h1 class="condition">${data.condition}</h1>
            <h1 class="temperature">${data.temperature}°C</h1>
            <p class="temperature-range">L:${data.tempLow}° H:${data.tempHigh}°</p>
        </div>
        <div class="additional-info">
            <div class="humidity">
                <span class="material-symbols-outlined">${humidityIcon}</span>
                <p class="humidity-value">HUMIDITY<br>${data.humidity}%</p>
            </div>
            <div class="wind">
                <span class="material-symbols-outlined">air</span>
                <p class="wind-value">WIND<br>${data.windSpeed}km/h</p>
            </div>                   
            <div class="temp-feels-like">
                <span class="material-symbols-outlined">thermostat</span>
                <p class="feels-like-value">FEELS LIKE<br>${data.feelsLike}&deg;</p>
            </div>   
        </div>
        <div class="temp-description">
            ${data.description || ''}
        </div>
    `;

    return card;
}

