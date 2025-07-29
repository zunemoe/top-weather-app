import { weatherData } from '../../modal/weather-data';
import LocationCard from '../components/location-card';

export default function locationListPage(locations = [], weatherData = {}) {
    const container = document.createElement('div');
    container.classList.add('location-list-page');    

    container.innerHTML = `
        <input type="text" placeholder="&#x1F50D; Search for a city or location..." class="location-search">
        <div class="search-overlay">
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

function populateLocationList(container, locations, weatherData) {
    const locationList = container.querySelector('.location-list');
    locationList.innerHTML = ''; // Clear previous content

    if (locations.length === 0) {
        locationList.innerHTML = '<div class="no-locations">No locations available</div
    }

    locations.forEach(location => {
        const locationWeatherData = weatherData[location];

        if (locationWeatherData) {
            const locationCard = LocationCard(location, locationWeatherData);

            locationCard.addEventListener('click', () => {
                handleLocationCardClick(location);
            });
            addRemoveButton(locationCard, location);
            locationList.appendChild(locationCard);
        } else {
            console.warn(`No weather data found for location: ${location}`);
        }
    });
}

function setupSearchInput(container) {
    const searchInput = container.querySelector('.location-search');
    let searchTimeout;

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.trim();
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (keyword.length > 2) handleLocationSearch(keyword, container);
            else if (keyword.length === 0) hideSearchOverlay(container);
        }, 300);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const keyword = e.target.value.trim();
            if (keyword) handleLocationSearch(keyword, container);
        }
    });

    // Hide overlay when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            hideSearchOverlay(container);
        }
    });
}

async function handleLocationCardClick(location) {
    try {
        console.log(`Location card clicked: ${location}`);
        const { loadWeatherForLocation } = await import('../../app/weather-controller');

        loadWeatherForLocation(location, weatherData[location]);
    } catch (error) {
        console.error('Error handling location card click:', error);
    }
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

async function handleLocationSearch(keyword, container) {
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


// async function handleLocationSearch(keyword, container) {
//     try {
//         const { searchLocation } = await import('../../app/location-controller');

//         showSearchLoading(container);
//         const searchResults = await searchLocation(keyword);
//         displaySearchResults(searchResults, container);

//     } catch (error) {
//         console.error('Error searching for location:', error);
//         showSearchError(container);
//     }
// }

// async function handleLocationCardClick(location) {
//     try {
//         const { loadWeatherForSelectedLocation } = await import('../../app/location-controller');
//         await loadWeatherForSelectedLocation(location);
//     } catch (error) {
//         console.error('Error handling location card click:', error);
//         showErrorFeedback('Failed to load weather data');
//     }
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

// // UI Helper Functions
// function showSearchLoading(container) {
//     const searchOverlay = container.querySelector('.search-overlay');
//     const searchResults = container.querySelector('.search-results');
    
//     searchResults.innerHTML = '<div class="search-loading">Searching location...</div>';
//     searchOverlay.style.display = 'block';
// }

// function displaySearchResults(results, container) {
//     const searchOverlay = container.querySelector('.search-overlay');
//     const searchResults = container.querySelector('.search-results');
    
//     searchResults.innerHTML = '';
//     searchOverlay.style.display = 'block';

//     if (results.length === 0) {
//         searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
//         return;
//     }

//     results.forEach(location => {
//         const resultItem = createSearchResultItem(location, container);
//         searchResults.appendChild(resultItem);
//     });
// }

// function createSearchResultItem(location, container) {
//     const item = document.createElement('div');
//     item.classList.add('search-result-item');
    
//     item.innerHTML = `
//         <div class="location-info">
//             <div class="location-name">${location.name}</div>
//             <div class="location-details">${location.region ? location.region + ', ' : ''}${location.country}</div>
//         </div>
//         <button class="add-location-btn">
//             <span class="material-symbols-outlined">add</span>
//         </button>
//     `;
    
//     item.addEventListener('click', () => {
//         handleLocationSelection(location, container);
//     });
    
//     return item;
// }

// function addRemoveButton(locationCard, location) {
//     const removeBtn = document.createElement('button');
//     removeBtn.className = 'location-remove-btn';
//     removeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
//     removeBtn.title = 'Remove location';
    
//     removeBtn.addEventListener('click', (e) => {
//         e.stopPropagation(); // Prevent location card click
//         handleLocationRemove(location);
//     });
    
//     locationCard.appendChild(removeBtn);
// }

// function hideSearchOverlay(container) {
//     const searchOverlay = container.querySelector('.search-overlay');
//     searchOverlay.style.display = 'none';
// }

// function clearSearchInput(container) {
//     const searchInput = container.querySelector('.location-search');
//     searchInput.value = '';
// }

// function showSearchError(container) {
//     const searchResults = container.querySelector('.search-results');
//     searchResults.innerHTML = '<div class="search-error">Error searching locations. Please try again.</div>';
// }

// // Feedback Functions
// function showSuccessFeedback(message) {
//     showFeedback(message, 'success');
// }

// function showErrorFeedback(message) {
//     showFeedback(message, 'error');
// }

// function showLocationAddingFeedback(message) {
//     showFeedback(message, 'loading');
// }

// function showFeedback(message, type) {
//     // Remove any existing feedback
//     const existingFeedback = document.querySelector('.location-feedback');
//     if (existingFeedback) {
//         existingFeedback.remove();
//     }

//     const feedback = document.createElement('div');
//     feedback.classList.add('location-feedback', `feedback-${type}`);
//     feedback.textContent = message;
    
//     document.body.appendChild(feedback);
    
//     // Auto-remove after delay
//     const delay = type === 'loading' ? 10000 : 3000;
//     setTimeout(() => {
//         if (feedback.parentNode) {
//             feedback.remove();
//         }
//     }, delay);
// }