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
        name: data.name,
        latitite: data.latitude,
        longitude: data.longitude,
        country: data.country ,
        region: data.region,
        isCapital: data.is_capital
    }
}