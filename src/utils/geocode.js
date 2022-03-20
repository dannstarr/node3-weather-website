const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFubnN0YXJyIiwiYSI6ImNsMG9nMmxqcDFtd3kza3VvZDY3Y2N1eGkifQ.57IZWBV04pnIKlclo9mTQA`
    
    request({ url: url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to location services', undefined) //no need to actually provide the second argument "undefined"
        }else if (res.body.features.length === 0) {
            callback('Unable to find location, try another search', undefined) //no need to actually provide the second argument "undefined"
        }else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
    
 }
 

 module.exports = geocode

 // const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGFubnN0YXJyIiwiYSI6ImNsMG9nMmxqcDFtd3kza3VvZDY3Y2N1eGkifQ.57IZWBV04pnIKlclo9mTQA'

// request({ url: url2, json: true }, (error, res) => {
//     const long = res.body.features[0].center[0]
//     const lat = res.body.features[0].center[1]
//     console.log(`longitude: ${long}`);
//     console.log(`latitude: ${lat}`);
// })