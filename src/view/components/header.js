export default function header() {
    const header = document.createElement('header');

    const currentLocation = document.createElement('div');
    currentLocation.classList.add('reload-location');
    currentLocation.innerHTML = `
        <span class="material-symbols-outlined">location_on</span>
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