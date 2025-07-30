import LocationListPage from '../view/pages/location-list-page';
import { locationData } from '../modal/location-data';
import { fetchLocationData } from '../services/location-api';
import { fetchWeatherData, fetchWeatherDataForLocations } from '../services/weather-api';
import { weatherData } from '../modal/weather-data';

let currentLocations = [];
let currentWeatherData = {};

const dummyMultiLocationsWeather = [
    {
        "queryCost": 1,
        "latitude": -36.8523,
        "longitude": 174.764,
        "resolvedAddress": "Auckland, New Zealand",
        "address": "Auckland",
        "timezone": "Pacific/Auckland",
        "tzoffset": 12,
        "days": [
            {
                "datetime": "2025-07-28",
                "datetimeEpoch": 1753617600,
                "tempmax": 18,
                "tempmin": 13,
                "temp": 14.9,
                "feelslikemax": 18,
                "feelslikemin": 13,
                "feelslike": 14.9,
                "dew": 8.8,
                "humidity": 67.4,
                "precip": 0.6,
                "precipprob": 100,
                "precipcover": 20.83,
                "preciptype": [
                    "rain"
                ],
                "snow": 0,
                "snowdepth": 0,
                "windgust": 60.8,
                "windspeed": 38.9,
                "winddir": 55.3,
                "pressure": 1024.4,
                "cloudcover": 91.9,
                "visibility": 11.2,
                "solarradiation": 114.7,
                "solarenergy": 9.8,
                "uvindex": 6,
                "severerisk": 10,
                "sunrise": "07:22:52",
                "sunriseEpoch": 1753644172,
                "sunset": "17:32:34",
                "sunsetEpoch": 1753680754,
                "moonphase": 0.1,
                "conditions": "Rain, Overcast",
                "description": "Cloudy skies throughout the day with a chance of rain throughout the day.",
                "icon": "rain",
                "stations": [
                    "NZAA",
                    "remote",
                    "C4778"
                ],
                "source": "comb"
            }
        ],
        "stations": {
            "NZAA": {
                "distance": 18941,
                "latitude": -37.02,
                "longitude": 174.8,
                "useCount": 0,
                "id": "NZAA",
                "name": "NZAA",
                "quality": 50,
                "contribution": 0
            },
            "C9203": {
                "distance": 5549,
                "latitude": -36.898,
                "longitude": 174.74,
                "useCount": 0,
                "id": "C9203",
                "name": "CW9203 Auckland NZ",
                "quality": 0,
                "contribution": 0
            },
            "C4778": {
                "distance": 2515,
                "latitude": -36.863,
                "longitude": 174.739,
                "useCount": 0,
                "id": "C4778",
                "name": "CW4778 Auckland NZ",
                "quality": 0,
                "contribution": 0
            },
            "E0594": {
                "distance": 6320,
                "latitude": -36.909,
                "longitude": 174.771,
                "useCount": 0,
                "id": "E0594",
                "name": "EW0594 Auckland NZ",
                "quality": 0,
                "contribution": 0
            }
        },
        "currentConditions": {
            "datetime": "22:48:00",
            "datetimeEpoch": 1753699680,
            "temp": 15.5,
            "feelslike": 15.5,
            "humidity": 74.8,
            "dew": 11.1,
            "precip": 0,
            "precipprob": 0,
            "snow": 0,
            "snowdepth": 0,
            "preciptype": null,
            "windgust": 43.6,
            "windspeed": 22.2,
            "winddir": 50,
            "pressure": 1020,
            "visibility": 10,
            "cloudcover": 100,
            "solarradiation": 0,
            "solarenergy": 0,
            "uvindex": 0,
            "conditions": "Overcast",
            "icon": "cloudy",
            "stations": [
                "C9203",
                "E0594",
                "NZAA",
                "C4778"
            ],
            "source": "obs",
            "sunrise": "07:22:52",
            "sunriseEpoch": 1753644172,
            "sunset": "17:32:34",
            "sunsetEpoch": 1753680754,
            "moonphase": 0.1
        }
    },
    {
        "queryCost": 1,
        "latitude": -33.8697,
        "longitude": 151.208,
        "resolvedAddress": "Sydney, NSW 2000, Australia",
        "address": "Sydney",
        "timezone": "Australia/Sydney",
        "tzoffset": 10,
        "days": [
            {
                "datetime": "2025-07-28",
                "datetimeEpoch": 1753624800,
                "tempmax": 18.9,
                "tempmin": 11,
                "temp": 14.2,
                "feelslikemax": 18.9,
                "feelslikemin": 11,
                "feelslike": 14.2,
                "dew": 4.2,
                "humidity": 52.3,
                "precip": 0,
                "precipprob": 0,
                "precipcover": 0,
                "preciptype": null,
                "snow": 0,
                "snowdepth": 0,
                "windgust": 57.6,
                "windspeed": 35.3,
                "winddir": 294.4,
                "pressure": 1007,
                "cloudcover": 24,
                "visibility": 11.8,
                "solarradiation": 145.7,
                "solarenergy": 12.6,
                "uvindex": 6,
                "severerisk": 10,
                "sunrise": "06:50:52",
                "sunriseEpoch": 1753649452,
                "sunset": "17:12:59",
                "sunsetEpoch": 1753686779,
                "moonphase": 0.11,
                "conditions": "Partially cloudy",
                "description": "Partly cloudy throughout the day.",
                "icon": "partly-cloudy-day",
                "stations": [
                    "D5330",
                    "YSRI",
                    "YSSY"
                ],
                "source": "comb"
            }
        ],
        "stations": {
            "D5330": {
                "distance": 1208,
                "latitude": -33.871,
                "longitude": 151.221,
                "useCount": 0,
                "id": "D5330",
                "name": "DW5330 Sydney AU",
                "quality": 0,
                "contribution": 0
            },
            "YSRI": {
                "distance": 49712,
                "latitude": -33.6,
                "longitude": 150.78,
                "useCount": 0,
                "id": "YSRI",
                "name": "YSRI",
                "quality": 50,
                "contribution": 0
            },
            "E8081": {
                "distance": 7082,
                "latitude": -33.814,
                "longitude": 151.171,
                "useCount": 0,
                "id": "E8081",
                "name": "EW8081 Lane Cove AU",
                "quality": 0,
                "contribution": 0
            },
            "D8873": {
                "distance": 7484,
                "latitude": -33.823,
                "longitude": 151.15,
                "useCount": 0,
                "id": "D8873",
                "name": "DW8873 Sydney AU",
                "quality": 0,
                "contribution": 0
            },
            "YSSY": {
                "distance": 9306,
                "latitude": -33.95,
                "longitude": 151.18,
                "useCount": 0,
                "id": "YSSY",
                "name": "YSSY",
                "quality": 50,
                "contribution": 0
            }
        },
        "currentConditions": {
            "datetime": "20:50:00",
            "datetimeEpoch": 1753699800,
            "temp": 13.3,
            "feelslike": 13.3,
            "humidity": 61.1,
            "dew": 6,
            "precip": 0,
            "precipprob": 0,
            "snow": 0,
            "snowdepth": 0,
            "preciptype": null,
            "windgust": 10.4,
            "windspeed": 2.1,
            "winddir": 133,
            "pressure": 1010,
            "visibility": 10,
            "cloudcover": 0,
            "solarradiation": 0,
            "solarenergy": 0,
            "uvindex": 0,
            "conditions": "Clear",
            "icon": "clear-night",
            "stations": [
                "E8081",
                "D5330",
                "D8873",
                "YSSY"
            ],
            "source": "obs",
            "sunrise": "06:50:52",
            "sunriseEpoch": 1753649452,
            "sunset": "17:12:59",
            "sunsetEpoch": 1753686779,
            "moonphase": 0.11
        }
    },
    {
        "queryCost": 1,
        "latitude": 51.5064,
        "longitude": -0.12721,
        "resolvedAddress": "London, England, United Kingdom",
        "address": "London",
        "timezone": "Europe/London",
        "tzoffset": 1,
        "days": [
            {
                "datetime": "2025-07-28",
                "datetimeEpoch": 1753657200,
                "tempmax": 23.5,
                "tempmin": 15.1,
                "temp": 19.6,
                "feelslikemax": 23.5,
                "feelslikemin": 15.1,
                "feelslike": 19.6,
                "dew": 10,
                "humidity": 55.1,
                "precip": 0,
                "precipprob": 0,
                "precipcover": 0,
                "preciptype": null,
                "snow": 0,
                "snowdepth": 0,
                "windgust": 32.4,
                "windspeed": 15.9,
                "winddir": 294.5,
                "pressure": 1019.4,
                "cloudcover": 69.9,
                "visibility": 17,
                "solarradiation": 193.4,
                "solarenergy": 16.8,
                "uvindex": 8,
                "severerisk": 10,
                "sunrise": "05:18:37",
                "sunriseEpoch": 1753676317,
                "sunset": "20:54:37",
                "sunsetEpoch": 1753732477,
                "moonphase": 0.12,
                "conditions": "Partially cloudy",
                "description": "Partly cloudy throughout the day.",
                "icon": "partly-cloudy-day",
                "stations": [
                    "EGWU",
                    "EGLL",
                    "D5621",
                    "EGLC"
                ],
                "source": "comb"
            }
        ],
        "stations": {
            "EGWU": {
                "distance": 20850,
                "latitude": 51.55,
                "longitude": -0.42,
                "useCount": 0,
                "id": "EGWU",
                "name": "EGWU",
                "quality": 50,
                "contribution": 0
            },
            "EGLC": {
                "distance": 12300,
                "latitude": 51.5,
                "longitude": 0.05,
                "useCount": 0,
                "id": "EGLC",
                "name": "EGLC",
                "quality": 50,
                "contribution": 0
            },
            "EGLL": {
                "distance": 22564,
                "latitude": 51.48,
                "longitude": -0.45,
                "useCount": 0,
                "id": "EGLL",
                "name": "EGLL",
                "quality": 50,
                "contribution": 0
            },
            "D5621": {
                "distance": 11192,
                "latitude": 51.535,
                "longitude": 0.028,
                "useCount": 0,
                "id": "D5621",
                "name": "DW5621 Upton Park UK",
                "quality": 0,
                "contribution": 0
            },
            "F6665": {
                "distance": 14583,
                "latitude": 51.437,
                "longitude": 0.051,
                "useCount": 0,
                "id": "F6665",
                "name": "FW6665 Mottingham UK",
                "quality": 0,
                "contribution": 0
            },
            "F8628": {
                "distance": 14897,
                "latitude": 51.612,
                "longitude": 0.005,
                "useCount": 0,
                "id": "F8628",
                "name": "M0BPQ Chingford UK",
                "quality": 0,
                "contribution": 0
            }
        },
        "currentConditions": {
            "datetime": "11:45:00",
            "datetimeEpoch": 1753699500,
            "temp": 22.4,
            "feelslike": 22.4,
            "humidity": 51.2,
            "dew": 11.9,
            "precip": 0,
            "precipprob": 0,
            "snow": 0,
            "snowdepth": 0,
            "preciptype": null,
            "windgust": 12.1,
            "windspeed": 7.1,
            "winddir": 289,
            "pressure": 1020,
            "visibility": 10,
            "cloudcover": 25,
            "solarradiation": 764,
            "solarenergy": 2.8,
            "uvindex": 8,
            "conditions": "Partially cloudy",
            "icon": "partly-cloudy-day",
            "stations": [
                "D5621",
                "F6665",
                "EGLC",
                "F8628"
            ],
            "source": "obs",
            "sunrise": "05:18:37",
            "sunriseEpoch": 1753676317,
            "sunset": "20:54:37",
            "sunsetEpoch": 1753732477,
            "moonphase": 0.12
        }
    },
    {
        "queryCost": 1,
        "latitude": 40.7146,
        "longitude": -74.0071,
        "resolvedAddress": "New York, NY, United States",
        "address": "New York",
        "timezone": "America/New_York",
        "tzoffset": -4,
        "days": [
            {
                "datetime": "2025-07-28",
                "datetimeEpoch": 1753675200,
                "tempmax": 33.9,
                "tempmin": 24.9,
                "temp": 29.4,
                "feelslikemax": 36.8,
                "feelslikemin": 24.9,
                "feelslike": 31.2,
                "dew": 20.7,
                "humidity": 60.6,
                "precip": 0,
                "precipprob": 0,
                "precipcover": 0,
                "preciptype": null,
                "snow": 0,
                "snowdepth": 0,
                "windgust": 16.6,
                "windspeed": 9.5,
                "winddir": 267,
                "pressure": 1015,
                "cloudcover": 10.2,
                "visibility": 16.2,
                "solarradiation": 304.6,
                "solarenergy": 26.3,
                "uvindex": 8,
                "severerisk": 30,
                "sunrise": "05:49:18",
                "sunriseEpoch": 1753696158,
                "sunset": "20:15:21",
                "sunsetEpoch": 1753748121,
                "moonphase": 0.12,
                "conditions": "Clear",
                "description": "Clear conditions throughout the day.",
                "icon": "clear-day",
                "stations": [
                    "KEWR",
                    "KLGA",
                    "F1417",
                    "KNYC"
                ],
                "source": "comb"
            }
        ],
        "stations": {
            "KLGA": {
                "distance": 10937,
                "latitude": 40.77,
                "longitude": -73.9,
                "useCount": 0,
                "id": "KLGA",
                "name": "KLGA",
                "quality": 100,
                "contribution": 0
            },
            "BATN6": {
                "distance": 1670,
                "latitude": 40.701,
                "longitude": -74.014,
                "useCount": 0,
                "id": "BATN6",
                "name": "The Battery, NY NWLON",
                "quality": 0,
                "contribution": 0
            },
            "KEWR": {
                "distance": 13842,
                "latitude": 40.7,
                "longitude": -74.17,
                "useCount": 0,
                "id": "KEWR",
                "name": "KEWR",
                "quality": 100,
                "contribution": 0
            },
            "F1417": {
                "distance": 3893,
                "latitude": 40.745,
                "longitude": -74.029,
                "useCount": 0,
                "id": "F1417",
                "name": "FW1417 Hoboken NJ US",
                "quality": 0,
                "contribution": 0
            },
            "KNYC": {
                "distance": 6577,
                "latitude": 40.77,
                "longitude": -73.98,
                "useCount": 0,
                "id": "KNYC",
                "name": "KNYC",
                "quality": 100,
                "contribution": 0
            },
            "F2280": {
                "distance": 2867,
                "latitude": 40.702,
                "longitude": -74.036,
                "useCount": 0,
                "id": "F2280",
                "name": "FW2280 Jersey City NJ US",
                "quality": 0,
                "contribution": 0
            }
        },
        "currentConditions": {
            "datetime": "06:48:00",
            "datetimeEpoch": 1753699680,
            "temp": 25.3,
            "feelslike": 25.3,
            "humidity": 78.8,
            "dew": 21.4,
            "precip": 0,
            "precipprob": 0,
            "snow": 0,
            "snowdepth": 0,
            "preciptype": null,
            "windgust": 4.7,
            "windspeed": 3.5,
            "winddir": 319,
            "pressure": 1015,
            "visibility": 16,
            "cloudcover": 0,
            "solarradiation": 117,
            "solarenergy": 0.4,
            "uvindex": 1,
            "conditions": "Clear",
            "icon": "clear-day",
            "stations": [
                "BATN6",
                "F1417",
                "KNYC",
                "F2280"
            ],
            "source": "obs",
            "sunrise": "05:49:18",
            "sunriseEpoch": 1753696158,
            "sunset": "20:15:21",
            "sunsetEpoch": 1753748121,
            "moonphase": 0.12
        }
    }
];

export async function loadWeatherForLocations(locations = []) {
    try {
        currentLocations = [...locations];
        // Fetch weather data for each location
        // const apiData = await fetchWeatherDataForLocations(locations);        
        
        // Transform API data
        // const locationsWeatherData = apiData.locations.reduce((acc, location) => {
        const locationsWeatherData = dummyMultiLocationsWeather.reduce((acc, location) => {
            const transformedWeatherData = weatherData(location);
            const currentWeather = transformedWeatherData.current;

            if (currentWeather) acc[location.address] = currentWeather;
            
            return acc;            
        }, {});
        currentWeatherData = locationsWeatherData;
        console.log('Transformed Weather Data:', locationsWeatherData);

        // Render the location list page with the fetched data
        renderLocationListPage(locations, locationsWeatherData);
    } catch (error) {
        console.error('Error loading weather for locations:', error);
        throw error;
    } 
}

export async function searchLocation(keyword) {
    try {
        // Fetch location data based on the keyword
        const apiData = await fetchLocationData(keyword);            
        // Transform API data - apiData is an array, so transform each location
        const locations = apiData.map(data => locationData(data));
        return locations;
    } catch (error) {
        console.error('Error searching for location:', error);
        throw error;
    }
}

export async function addLocationToList(location) {
    try {
        if (currentLocations.includes(location.name)) {
            console.warn(`Location "${location.name}" is already in the list.`);
            return;
        }

        // Fetch weather data for the location
        const apiData = await fetchWeatherData(location.name);
        const transformedWeatherData = weatherData(apiData);
        const currentWeather = transformedWeatherData.current;

        if (!currentWeather) {
            console.error(`No current weather data found for location: ${location.name}`);
            return;
        }

        currentLocations.unshift(location.name);
        currentWeatherData[location.name] = currentWeather;

        renderLocationListPage(currentLocations, currentWeatherData);

        return {
            success: true,
            location: location.name,
            weather: currentWeather
        };
    } catch (error) {
        console.error('Error adding location to list:', error);
        throw error;
    }
}

export function removeLocationFromList(location) {
    try {
        currentLocations = currentLocations.filter(loc => loc !== location);
        delete currentWeatherData[location];

        renderLocationListPage(currentLocations, currentWeatherData);

        return { success: true };
    } catch (error) {
        console.error('Error removing location from list:', error);
        throw error;
    }
}

export async function loadWeatherForSelectedLocation(location) {
    try {
        const existingWeatherData = currentWeatherData[location];
        if (!existingWeatherData) {
            console.warn(`No existing weather data found for location: ${location}`);
            return;
        }

        const { loadWeatherForLocation } = await import('./weather-controller');
        await loadWeatherForLocation(location, existingWeatherData);

        return { success: true };
    } catch (error) {
        console.error('Error loading weather for selected location:', error);
        throw error;
    }
}

function renderLocationListPage(locations = [], weatherData = {}) {
    const locationListPageElement = LocationListPage(locations, weatherData);
    const app = document.getElementById('app');

    app.innerHTML = '';
    app.appendChild(locationListPageElement);
}

export function getCurrentLocations() {
    return currentLocations;
}

export function getCurrentWeatherData() {
    return currentWeatherData;
}