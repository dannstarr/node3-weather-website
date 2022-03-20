const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { application } = require('express')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
            error: "Please provide a location"
        })
    }

    geocode(req.query.address, (error, geoData) => {
        if (error) {
           return res.send({
               error: error //could use shorthand here and just type error once because the key is the same as the value - as done below
            });
        }
        forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error}); //here is the shorthand version
            }else {
                res.send({
                    address_searched: req.query.address,
                    location: geoData.location,
                    current: forecastData.current,
                    temperature: forecastData.temperature,
                    feels_like: forecastData.feels_like,
                    rain: forecastData.precip,
                    wind_speed: forecastData.wind_speed,
                    wind_direction: forecastData.wind_direction,
                    cloud_cover: forecastData.cloud_cover,
                    visibility: forecastData.visibility
                });
                
               
            }
            
          })
    
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 not found',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 not found',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})