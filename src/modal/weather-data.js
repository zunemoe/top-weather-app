export function weatherData(data) {
    return {
        location: data.location || 'Unknown Location',
        temperature: data.temperature || 'N/A',
        condition: data.condition || 'Unknown Condition',
        temperatureRange: data.temperatureRange || 'N/A',
        icon: data.icon || 'sunny',
        humidity: data.humidity || 'N/A',
        windSpeed: data.windSpeed || 'N/A',
        pressure: data.pressure || 'N/A',
        visibility: data.visibility || 'N/A',
        sunrise: data.sunrise || 'N/A',
        sunset: data.sunset || 'N/A',
        forecast: data.forecast || [],
        uiIndex: data.uiIndex || 0,
        feelsLike: data.feelsLike || 'N/A',
        lastUpdated: data.lastUpdated || 'N/A'
    }
}

export function hourlyForecastData(data) {
    const hourlyData = data;
    return hourlyData.map(hour => ({
        time: hour.time || 'N/A',
        temperature: hour.temperature || 'N/A',
        condition: hour.condition || 'Unknown Condition',
        icon: hour.icon || 'sunny'
    }));
}

export function weeklyForecastData(data) {
    const weeklyData = data;
    return weeklyData.map(day => ({
        date: day.date || 'N/A',
        high: day.high || 'N/A',
        low: day.low || 'N/A',
        condition: day.condition || 'Unknown Condition',
        icon: day.icon || 'sunny'
    }));
}