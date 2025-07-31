# Weather App (The Odin Project)
A dynamic weather application that allows users to search for locations, view current weather conditions and manage a list of favorite locations.
Built with JavaScript and a modular architecture which provides a user-friendly interface.

---

## Overview
The Weather App is designed to provide a real-time weather updates for multiple locations. Users can:
- Search for locations and view their weather details.
- Add or remove locations from their favorite list.
- View detailed weather information, including temperature, humidity, wind speed and more.
- Switch between different views (e.g. home page and location list).

---

## Features
- **Search Functionality**: Search for locations using keywords.
- **Favorites Management**: Add or remove locations from the favorites list.
- **Weather Details**: View detailed weather information, including temperature, humidity, wind speed and conditions.
- **Mobile Oriented Design**: Designed to be used in mobile phones
- **Local Storage**: Persist favorite locations.

---

## Architecture
The app follows a modular architecture with a clear separation of concerns.

### Key Components
- **Controllers**: Handle business logic (fetching weather data, managing locations).
- **Views**: Render UI components and handle user interactions.
- **Storage**: Manage persistent data using `localStorage`.

---

## Technologies Used
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Build Tool**: Webpack
- **APIs**
    - Weather data: Visualcrossing (https://www.visualcrossing.com/)
    - Location data: API Ninja (https://api-ninjas.com/api/city)

---

## Future Improvements
- **User Preferences**: Allow user to switch between Metrics and Imperial units and persist with `localStorage`.
- **Error Handling**: Improve error messages for failed API requests.
- **Testing**: Add unit and integration tests.
- **Responsive**: Add responsiveness for desktop mode