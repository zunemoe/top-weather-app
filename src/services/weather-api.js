const API_KEY = 'J2YM73DR4ZRLGA27BV75387RT';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/';
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

export async function fetchWeatherData(location, unit = 'metric') {
    // Date format: yyyy-MM-dd
    const today = new Date();
    const tenDaysFromNow = new Date();
    tenDaysFromNow.setDate(today.getDate() + 10);

    let start_date = "/" + formatDate(today);
    let end_date = "/" + formatDate(tenDaysFromNow);

    try {
        const response = await fetch(`${BASE_URL}timeline/${location}${start_date}${end_date}?key=${API_KEY}&unitGroup=${unit}&include=hours,current`, {
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

export async function fetchWeatherDataForLocations(locations, unit = 'metric') {
    // Date format: yyyy-MM-dd
    const today = new Date();
    const tenDaysFromNow = new Date();
    tenDaysFromNow.setDate(today.getDate());

    let start_date = formatDate(today);
    let end_date = formatDate(tenDaysFromNow);

    const locationString = Array.isArray(locations) ? locations.join('|') : locations;
    const encodedLocations = encodeURIComponent(locationString);

    try {
        const response = await fetch(`${BASE_URL}timelinemulti?key=${API_KEY}&locations=${encodedLocations}&datestart=${start_date}&dateend=${end_date}&unitGroup=${unit}&include=current`, {
            mode: 'cors'       
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data for multiple locations:', error);
        throw error;
    }
}

function formatDate(dateInput) {
    return new Date(dateInput).toISOString().split('T')[0];
}
