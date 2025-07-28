//https://api.api-ninjas.com/v1/city?name=your_city_name
// Headers
// X-Api-Key 'PJS+f0k9e3l4QBoyEtgCXA==1nJkDmvOevATQRqJ'

const LOCATION_BASE_URL = 'https://api.api-ninjas.com/v1/city';
const LOCATION_API_KEY = 'PJS+f0k9e3l4QBoyEtgCXA==1nJkDmvOevATQRqJ';

export async function fetchLocationData(location) {
    try {
        const response = await fetch(`${LOCATION_BASE_URL}?name=${location}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': LOCATION_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();        
        return data.length > 0 ? data[0] : null; // Return the first result or null if not found
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error;
    }
}

export async function fetchMultipleLocationsData(locations) {
    try {

    } catch (error) {
        console.error('Error fetching multiple locations data:', error);
        throw error;
    }
}

const LOCATION_PHOTO_BASE_URL = '';
const LOCATION_PHOTO_API_KEY = '';

export async function fetchLocationPhoto(location) {
    try {

    } catch (error) {
        console.error('Error fetching location photo:', error);
        throw error;
    }
}