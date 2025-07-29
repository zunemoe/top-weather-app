import { getWeatherIcon } from '../../app/utility';
export default function locationCard(location, weather = {}) {
    const card = document.createElement('div'); 
    card.classList.add('location-card');
    // Todo: Change metric dynamically based on user preference
    const humidityIcon = weather.humidity <= 30 ? 'humidity_low' :
        weather.humidity <= 70 ? 'humidity_mid' : 'humidity_high';
    card.innerHTML = `
        <div class="location-card-info">
            <h1 class="location-card-name">${location}</h1>
            <p class="location-card-condition">${weather.condition}</p>
            <div class="humidity">
                <span class="material-symbols-outlined">${humidityIcon}</span>
                <p class="humidity-value">${weather.humidity}%</p>
            </div>
            <div class="wind">
                <span class="material-symbols-outlined">air</span>
                <p class="wind-value">${weather.windSpeed}km/h</p>
            </div>  
        </div>
        <div class="location-card-weather">      
            <img src="${getWeatherIcon(weather.icon)}" alt="${weather.condition}" class="location-card-icon">            
            <h1 class="location-card-temperature">${weather.temperature}°</h1>            
        </div>
    `;
    return card;
}