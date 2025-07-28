import LocationCard from '../components/location-card';

export default function locationListPage(locations = [], weatherData = {}) {
    const container = document.createElement('div');
    container.classList.add('location-list-page');    

    container.innerHTML = `
        <input type="text" placeholder="Search for a city or location..." class="location-search">
        <div class="location-list">
            
        </div>
    `;
    
    const locationList = container.querySelector('.location-list');
    locations.forEach(location => {
        const locationWeatherData = weatherData[location];

        if (locationWeatherData) {
            const locationCard = LocationCard(location, locationWeatherData);
            locationList.appendChild(locationCard);
        } else {
            console.warn(`No weather data found for location: ${location}`);
        }
    });

    const searchInput = container.querySelector('.location-search');
    addSearchLocationEventListener(searchInput)
    return container;
}

function addSearchLocationEventListener(inputElement) {
    if (inputElement) {
        let searchTimeout;

        inputElement.addEventListener('input', (e) => {
            const keyword = e.target.value.trim();
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (keyword.length > 2) {
                    handleLocationSearch(keyword);
                } else if (keyword.length === 0) {
                    clearSearchResults();
                }
            }, 300);
        });

        inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const keyword = e.target.value.trim();
                if (keyword) handleLocationSearch(keyword);
            }
        });
    }
}

async function handleLocationSearch(keyword) {
    try {
        const { searchLocation } = await import('../../app/location-controller');

        showSearchLoading();

        const searchResults = await searchLocation(keyword);
        displaySearchResults(searchResults);

    } catch (error) {
        console.error('Error searching for location:', error);
    }
}

function showSearchLoading() {
    const locationList = document.querySelector('.location-list');
    locationList.innerHTML = '<div class="sarch-loading">Searching location...</div>';
}

function displaySearchResults(results) {
    const locationList = document.querySelector('.location-list');
    locationList.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        locationList.innerHTML = '<div class="search-no-results">No results found</div>';
        return;
    }

    results.forEach(location => {
        const locationCard = LocationCard(location);
        locationList.appendChild(locationCard);
    });
}

function clearSearchResults(container) {
    const locationList = container.querySelector('.location-list');
    locationList.innerHTML = ''; // Clear search results
}