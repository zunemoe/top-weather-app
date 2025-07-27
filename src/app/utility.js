export function getWeatherIcon(icon) {
    try {        
        return require(`../assets/images/weather-icon-color/${icon}.png`);
    } catch (error) {
        console.error('Error getting weather icon:', error);
    }
}