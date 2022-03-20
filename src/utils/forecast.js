const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0998d2a5843d2394dae1a3a539c1f76b&query=${lat},${long}`

    request({ url: url, json: true, }, (error, res) => {
        if (error) {
            callback('Unable to connect to Weather services')
        }else if (res.body.error) {
            callback('Unable to get current weather conditions')
        }else {
            callback(undefined, {
                current: res.body.current.weather_descriptions[0],
                temperature: res.body.current.temperature,
                feels_like: res.body.current.feelslike,
                precip:  res.body.current.precip,
                wind_speed: res.body.current.wind_speed,
                wind_direction: res.body.current.wind_dir,
                cloud_cover: res.body.current.cloudcover,
                visibility: res.body.current.visibility,
            }
             )

        }

    })
}

module.exports = forecast


// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

