export default function locationCard(location, weather = {}) {
    const card = document.createElement('div'); 
    card.classList.add('location-card');
    // Todo: Change metric dynamically based on user preference
    card.innerHTML = `
        <div class="location-card-info">
            <h1 class="location-card-name">${location.name}</h1>
            <p class="location-card-condition">${weather.condition}</p>
            <p class="location-card-humidity">Humidity: <span>${weather.humidity}%</span></p>
            <p class="location-card-wind">Wind: <span>${weather.windSpeed}</span> km/h
        </div>
        <div class="location-card-weather">      
            <img src="../../assets/images/weather-icon-color/${weather.icon}.png" alt="${weather.condition}" class="location-card-icon">            
            <h1 class="location-card-temperature">${weather.temperature}°C</h1>            
        </div>
    `;
    return card;
}