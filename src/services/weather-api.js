const API_KEY = 'J2YM73DR4ZRLGA27BV75387RT';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/';

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
