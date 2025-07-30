import { weatherData } from '../../modal/weather-data';
import LocationCard from '../components/location-card';

export default function locationListPage(locations = [], weatherData = {}) {
    const container = document.createElement('div');
    container.classList.add('location-list-page');    

    container.innerHTML = `
        <div class="search-input-container">
            <input type="text" placeholder="&#x1F50D; Search for a city or location..." class="location-search">
            <button class="cancel-search-btn"><span class="material-symbols-outlined">cancel</span></button>
        </div>            
        <div class="search-result-container">
        </div>
        <div class="location-list">            
        </div>
    `;
    
    populateLocationList(container, locations, weatherData);
    setupSearchInput(container);
    return container;

    // const locationList = container.querySelector('.location-list');
    // locations.forEach(location => {
    //     const locationWeatherData = weatherData[location];

    //     if (locationWeatherData) {
    //         const locationCard = LocationCard(location, locationWeatherData);

    //         locationCard.addEventListener('click', () => {
    //             handleLocationCardClick(location);
    //         });

    //         locationList.appendChild(locationCard);
    //     } else {
    //         console.warn(`No weather data found for location: ${location}`);
    //     }
    // });

    // const searchInput = container.querySelector('.location-search');
    // addSearchLocationEventListener(searchInput)
    
}

// Location List and Click Handler
function populateLocationList(container, locations, weatherData) {
    const locationList = container.querySelector('.location-list');
    locationList.innerHTML = ''; // Clear previous content

    if (locations.length === 0) {
        locationList.innerHTML = '<div class="no-locations">No locations available</div>';
    }

    locations.forEach(location => {
        const locationWeatherData = weatherData[location];

        if (locationWeatherData) {
            const locationCard = LocationCard(location, locationWeatherData);

            locationCard.addEventListener('click', () => {
                handleLocationCardClick(location);
            });            

            // Add delete functionality
            const deleteCardBtn = locationCard.querySelector('.delete-location');
            if (deleteCardBtn) {
                deleteCardBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card click event
                    handleLocationDelete(location);
                });
            }

            locationList.appendChild(locationCard);
        } else {
            console.warn(`No weather data found for location: ${location}`);
        }
    });
}

async function handleLocationDelete(location) {
    try {
        const confirmation = confirm(`Are you sure you want to delete the location: ${location}?`);
        if (!confirmation) return;

        const { removeLocationFromList } = await import('../../app/location-controller');
        await removeLocationFromList(location);
    } catch (error) {
        console.error('Error deleting location:', error);
    }   
}

async function handleLocationCardClick(location) {
    try {
        console.log(`Location card clicked: ${location}`);
        const { loadWeatherForLocation } = await import('../../app/weather-controller');

        await loadWeatherForLocation(location, weatherData[location]);
        // await loadWeatherForSelectedLocation(location);
    } catch (error) {
        console.error('Error handling location card click:', error);
    }
}

// Search Functionalities
function setupSearchInput(container) {
    const searchInput = container.querySelector('.location-search');
    const cancelSearchBtn = container.querySelector('.cancel-search-btn');
    let searchTimeout;

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.trim();
        clearTimeout(searchTimeout);

        if (keyword.length > 0) cancelSearchBtn.classList.add('active');
        else cancelSearchBtn.classList.remove('active');

        searchTimeout = setTimeout(() => {
            if (keyword.length > 2) handleLocationSearch(keyword, container);
            else if (keyword.length === 0) toggleSearchAndLocationList(container);
        }, 300);
    });

    cancelSearchBtn.addEventListener('click', () => {
        toggleSearchAndLocationList(container);
        cancelSearchBtn.classList.remove('active');
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const keyword = e.target.value.trim();
            if (keyword) handleLocationSearch(keyword, container);
        }

        if (e.key === 'Escape') {
            toggleSearchAndLocationList(container);
            cancelSearchBtn.classList.remove('active');
        }
    });

    // // Hide overlay when clicking outside
    // document.addEventListener('click', (e) => {
    //     if (!container.contains(e.target)) {
    //         hideSearchOverlay(container);
    //     }
    // });
}

async function handleLocationSearch(keyword, container) {    
    try {
        const { searchLocation } = await import('../../app/location-controller');

        // showSearchLoading(container);

        const locations = await searchLocation(keyword);
        displaySearchResults(locations, container);
    } catch (error) {
        console.error('Error searching for location:', error);
    }
}

function displaySearchResults(results, container) {
    const searchResultContainer = container.querySelector('.search-result-container');
    const locationList = container.querySelector('.location-list');
    searchResultContainer.innerHTML = '';

    results.forEach(location => {
        const resultItem = createSearchResultItem(location, container);
        searchResultContainer.appendChild(resultItem);
    });

    toggleSearchAndLocationList(container);
}

function createSearchResultItem(location, container) {
    const item = document.createElement('div');
    item.classList.add('search-result-item');
    
    item.innerHTML = `
        <div class="location-name">${location.name}</div>
        <div class="location-details">${location.region ? location.region + ', ' : ''}${location.country}</div>
    `;
    
    item.addEventListener('click', () => {
        handleLocationSelection(location, container);
    });
    
    return item;
}

async function handleLocationSelection(location, container) {
    try {
        const { addLocationToList } = await import('../../app/location-controller');        
        // Hide the search overlay and clear input
        toggleSearchAndLocationList(container);

        // Add location through controller
        await addLocationToList(location);        
    } catch (error) {
        console.error('Error selecting location:', error);
    }
}

// function clearSearchResults(container) {
//     const searchResultContainer = container.querySelector('.search-result-container');
//     searchResultContainer.innerHTML = ''; // Clear search results
// }

// async function handleLocationSelection(location, container) {
//     try {
//         const { addLocationToList } = await import('../../app/location-controller');
        
//         // Hide the search overlay and clear input
//         hideSearchOverlay(container);
//         clearSearchInput(container);
        
//         // Show adding state
//         showLocationAddingFeedback('Adding location...');
        
//         // Add location through controller
//         await addLocationToList(location);
        
//         // Show success feedback
//         showSuccessFeedback(`${location.name} added successfully!`);
        
//     } catch (error) {
//         console.error('Error adding location:', error);
//         showErrorFeedback(error.message || 'Failed to add location');
//     }
// }

// async function handleLocationRemove(locationName) {
//     try {
//         const { removeLocationFromList } = await import('../../app/location-controller');
//         await removeLocationFromList(locationName);
//         showSuccessFeedback(`${locationName} removed successfully!`);
//     } catch (error) {
//         console.error('Error removing location:', error);
//         showErrorFeedback('Failed to remove location');
//     }
// }


function toggleSearchAndLocationList(container) {
    const searchOverlay = container.querySelector('.search-result-container');
    const locationList = container.querySelector('.location-list');

    if (searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        locationList.classList.remove('hidden');

        const searchInput = container.querySelector('.location-search');
        searchInput.value = '';

        clearSearchResults(container);
    } else {
        searchOverlay.classList.add('active');
        locationList.classList.add('hidden');
    }
}

function clearSearchResults(container) {
    const searchResultContainer = container.querySelector('.search-result-container');
    searchResultContainer.innerHTML = ''; // Clear search results
}

// function hideSearchOverlay(container) {
//     const searchOverlay = container.querySelector('.search-result-container');
//     searchOverlay.classList.remove('active');
// }

// function clearSearchInput(container) {
//     const searchInput = container.querySelector('.location-search');
//     searchInput.value = '';
// }
