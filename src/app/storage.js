const STORAGE_KEYS = {
    LOCATION_LIST: 'weather_app_locations',
    CURRENT_LOCATION: 'weather_app_current_location',
    WEATHER_DATA: 'weather_app_weather_data',
    USER_PREFERENCES: 'weather_app_preferences'
}

function getDefaultLocations() {
    return ["Auckland", "Sydney", "London"];
}

export function saveLocationList(locations) {
    try {
        localStorage.setItem(STORAGE_KEYS.LOCATION_LIST, JSON.stringify(locations));
        console.log('Location list saved successfully:', locations);
        return true;
    } catch (error) {
        console.error('Error saving location list:', error);
        return false;
    }
}

export function getLocationList() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.LOCATION_LIST);
        if (!stored) return getDefaultLocations();

        return JSON.parse(stored) || getDefaultLocations();
    } catch (error) {
        console.error('Error retrieving location list:', error);
        return getDefaultLocations();
    }
}

export function saveCurrentLocation(location) {
    try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_LOCATION, JSON.stringify(location));
        console.log('Current location saved successfully:', location);
        return true;
    } catch (error) {
        console.error('Error saving current location:', error);
        return false;
    }
}

export function getCurrentLocation() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_LOCATION);
        if (!stored) return getDefaultLocations()[0];

        const location = JSON.parse(stored);
        return location || getDefaultLocation()[0];
    } catch (error) {
        console.error('Error retrieving current location:', error);
        return getDefaultLocations()[0]; // Return the first default location
    }
}

function getDefaultPreferences() {
    return {
        unit: 'metric',
        timeFormat: '24h'
    };
}

export function saveUserPreferences(preferences) {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
        console.log('User preferences saved successfully:', preferences);
    } catch (error) {
        console.error('Error saving user preferences:', error);
        return false;
    }
}

export function getUserPreferences() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
        if (!stored) return getDefaultPreferences();

        const preferences = JSON.parse(stored);
        return {
            ...getDefaultPreferences(),
            ...preferences
        };
    } catch (error) {
        console.error('Error retrieving user preferences:', error);
        return getDefaultPreferences();
    }
}

