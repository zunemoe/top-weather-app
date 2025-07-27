// Sample JSON:
// [
//   {
//     "name": "Auckland",
//     "latitude": -36.85,
//     "longitude": 174.783,
//     "country": "NZ",
//     "population": 1467800,
//     "region": "Auckland",
//     "is_capital": false
//   }
// ]

export function locationData(data) {
    return {
        name: data.name || 'Unknown Location',
        latitite: data.latitude || 0,
        longitude: data.longitude || 0,
        country: data.country || 'Unknown Country',
        region: data.region || 'Unknown Region',
        isCapital: data.is_capital || false,
    }
}