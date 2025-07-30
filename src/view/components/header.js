export default function header(pageType = 'weather', options = {}) {
    const header = document.createElement('header');

    if (pageType === 'weather') {
        const reloadBtn = createReloadButton(options.onReload);
        const locationListBtn = createLocationListButton(options.onLocationList);
        header.classList.add('weather-header');
        header.appendChild(reloadBtn);
        header.appendChild(locationListBtn);
    } else if (pageType === 'locations') {
        const reloadBtn = createReloadButton(options.onRefresh);
        const closeBtn = createCloseButton(options.onClose);
        header.classList.add('location-list-header');
        header.appendChild(reloadBtn);
        header.appendChild(closeBtn);
    }

    return header;

    const currentLocation = document.createElement('button');
    currentLocation.classList.add('reload-location');
    currentLocation.innerHTML = `
        <span class="material-symbols-outlined">refresh</span>
    `;

    const locationListBtn = document.createElement('button');
    locationListBtn.classList.add('location-list-btn');
    locationListBtn.innerHTML = `
        <span class="material-symbols-outlined">format_list_bulleted</span>
        `;

    header.appendChild(currentLocation);
    header.appendChild(locationListBtn);
    return header;
}

export function createReloadButton(onClick) {
    const button = document.createElement('button');
    button.classList.add('reload-location');
    button.innerHTML = `
        <span class="material-symbols-outlined">refresh</span>
    `;

    if (onClick) button.addEventListener('click', onClick);
    return button;
}

export function createLocationListButton(onClick) {
    const button = document.createElement('button');
    button.classList.add('location-list-btn');
    button.innerHTML = `
        <span class="material-symbols-outlined">format_list_bulleted</span>
    `;

    if (onClick) button.addEventListener('click', onClick);
    return button;
}

export function createCloseButton(onClick) {
    const button = document.createElement('button');
    button.classList.add('close-location-list-btn');
    button.innerHTML = `
        <span class="material-symbols-outlined">close</span>
    `;

    if (onClick) button.addEventListener('click', onClick);
    return button;
}

export function createRefreshButton(onClick) {
    const button = document.createElement('button');
    button.classList.add('refresh-location-btn');
    button.innerHTML = `
        <span class="material-symbols-outlined">refresh</span>
    `;

    if (onClick) button.addEventListener('click', onClick);
    return button;
}