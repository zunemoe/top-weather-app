export function weatherData(data) {
    return {
        current: currentWeatherData(data),
        hourly: hourlyForecastData(data),
        weekly: weeklyForecastData(data)
    }

    function currentWeatherData(data) {
        const current = data.currentConditions;
        const today = data.days[0];

        let currentData;

        if (current) {
            currentData = current;
        } else {
            const currentour = new Date().getHours();
            const todayHours = today.hours || [];
            const currentHourData = todayHours[currentour];

            if (currentHourData) currentData = currentHourData;
            else currentData = todayHours[0] || today;
        }

        // if there is no current conditions, get the current time data from today's data
        return {
            location: data.address,
            temperature: Math.round(currentData.temp),
            condition: currentData.conditions,
            tempLow: Math.round(today.tempmin),
            tempHigh: Math.round(today.tempmax),
            icon: currentData.icon,
            humidity: Math.round(currentData.humidity),
            windSpeed: currentData.windspeed,
            windDirection: currentData.winddir,
            windGust: currentData.windgust,
            pressure: currentData.pressure,
            visibility: currentData.visibility,
            sunrise: currentData.sunrise || today.sunrise,
            sunset: currentData.sunset || today.sunset,
            uvIndex: currentData.uvindex,
            feelsLike: Math.round(currentData.feelslike),
            precipitation: Math.round(currentData.precipprob || 0),
            description: today.description
        }
    }

    function hourlyForecastData(data) {        
        // Get the next 24 hours of data
        const currentHour = new Date().getHours();
        const todayHours = data.days[0].hours || [];
        const tomorrowHours = data.days[1] ? data.days[1].hours : [];

        const remainingTodayHours = todayHours.slice(currentHour);
        const hoursFromTomorrow = 24 - remainingTodayHours.length;
        const remainingTomorrowHours = tomorrowHours.slice(0, hoursFromTomorrow);

        const hourlyData = [...remainingTodayHours, ...remainingTomorrowHours];

        return hourlyData.map(hour => ({
            time: hour.datetime?.slice(0, 5), // Format time as HH:MM
            temperature: Math.round(hour.temp),
            condition: hour.conditions,
            icon: hour.icon,
            precipitation: Math.round(hour.precipprob)
        }));
    }

    function weeklyForecastData(data) {        
        const weeklyData = data.days || [];

        return weeklyData.slice(0, 10).map((day, index) => ({
            date: index === 0 ? 'Today' :
            index === 1 ? 'Tomorrow' :
            new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short' }),            
            tempLow: Math.round(day.tempmin),
            tempHigh: Math.round(day.tempmax),
            condition: day.conditions,
            icon: day.icon,
            humidity: day.humidity,
            precipitation: Math.round(day.precipprob),
            description: day.description
        }));
    }
}

