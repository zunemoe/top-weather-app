const API_KEY = 'J2YM73DR4ZRLGA27BV75387RT';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
// Parameters for the API request base_url/location/start_date/end_date?key=API_KEY&unitGroup=metric

// iconSet=icons1 (default)
// Icon id	Weather Conditions
// snow	Amount of snow is greater than zero
// rain	Amount of rainfall is greater than zero
// fog	Visibility is low (lower than one kilometer or mile)
// wind	Wind speed is high (greater than 30 kph or mph)
// cloudy	Cloud cover is greater than 90% cover
// partly-cloudy-day	Cloud cover is greater than 20% cover during day time.
// partly-cloudy-night	Cloud cover is greater than 20% cover during night time.
// clear-day	Cloud cover is less than 20% cover during day time
// clear-night	Cloud cover is less than 20% cover during night time
// https://github.com/visualcrossing/WeatherIcons

/**
 * Fetch weather data from Visual Crossing API
 * @param {string|Date} dateInput - The date to format
 * @returns {string} - Formatted date string
 */

export async function fetchWeatherData(location, unit = 'metric', start_date = '', end_date = '') {
    // Date format: yyyy-MM-dd
    let startDate = start_date? "/" + formatDate(start_date) : '';
    let endDate = end_date? "/" + formatDate(end_date) : '';
    try {
        const response = await fetch(`${BASE_URL}${location}${startDate}${endDate}?key=${API_KEY}&unitGroup=${unit}&include=hours,current`, {
            mode: 'cors'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Multiple locations in the same request
// https://www.visualcrossing.com/resources/documentation/weather-api/using-the-timeline-weather-api-with-multiple-locations-in-the-same-request/

export async function fetchWeatherDataForLocations(locations, unit = 'metric', start_date = '', end_date = '') {
    // Date format: yyyy-MM-dd
    let startDate = start_date? "/" + formatDate(start_date) : '';
    let endDate = end_date? "/" + formatDate(end_date) : '';
}

function formatDate(dateInput) {
    return new Date(dateInput).toISOString().split('T')[0];
}
