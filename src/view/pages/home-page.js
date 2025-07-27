import WeatherInfo from '../components/weather-info';
import HourlyForecast from '../components/hourly-forecast';
import WeeklyForecast from '../components/weekly-forecast';
import MeasurementPanel from '../components/measurement-panel';

export default function homePage(data = {}) {
    const container = document.createElement('div');
    container.classList.add('home-page');
    
    container.appendChild(WeatherInfo(data.current));
    container.appendChild(HourlyForecast(data.hourly));
    // TODO: Uncomment the line below when WeeklyForecast and MeasurementPanel are implemented
    container.appendChild(WeeklyForecast(data.weekly));
    // container.appendChild(MeasurementPanel(data.current));

    return container;
}