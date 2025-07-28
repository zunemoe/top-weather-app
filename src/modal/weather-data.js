// Sample json response from the API
// {
//     "latitude" : 38.9697,
//     "longitude" : -77.385,
//     "resolvedAddress" : "Reston, VA, United States",
//     "address" : " Reston,VA",
//     "timezone" : "America/New_York",
//     "tzoffset" : -5,
//     "description":"Cooling down with a chance of rain on Friday.",
//     "days" : [{ //array of days of weather data objects
//         "datetime":"2020-11-12",
//         "datetimeEpoch":1605157200,
//         "temp" : 59.6,
//         "feelslike" : 59.6,
//         ...
//         "stations" : {
//         },
//         "source" : "obs",
//         "hours" : [{  //array of hours of weather data objects
//             "datetime" : "01:00:00",
//             ...
//         },...]
//     },...],
//     "alerts" : [{
//             "event" : "Flash Flood Watch",
//             "description" : "...",
//             ...
//         }
//     ],
//     "currentConditions" : {
//         "datetime" : "2020-11-11T22:48:35",
//         "datetimeEpoch" : 160515291500,
//         "temp" : 67.9,
//         ...
//     }
// }

export function weatherData(data) {
    return {
        current: currentWeatherData(data),
        hourly: hourlyForecastData(data),
        weekly: weeklyForecastData(data)
    }

    function currentWeatherData(data) {
        const current = data.currentConditions;
        const today = data.days[0];

        return {
            location: data.address,
            temperature: Math.round(current.temp),
            condition: current.conditions,
            tempLow: Math.round(today.tempmin),
            tempHigh: Math.round(today.tempmax),
            icon: current.icon,
            humidity: Math.round(current.humidity),
            windSpeed: current.windspeed,
            windDirection: current.winddir,
            windGust: current.windgust,
            pressure: current.pressure,
            visibility: current.visibility,
            sunrise: current.sunrise,
            sunset: current.sunset,
            uvIndex: current.uvindex,
            feelsLike: Math.round(current.feelslike),
            precipitation: Math.round(current.precipprob),
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

