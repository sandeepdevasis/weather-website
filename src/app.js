const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sandeep Nayak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sandeep Nayak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sandeep Nayak'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
       return res.send({
            error: "You must pass an address !!"
        })
    }

    console.log('Query printing: '+req.query.address);
    geoCode(req.query.address,(error,{lattitude, longitude,location}={})=>{
        if(error){
            console.log('Error in GeoCode  '+error)
            return res.send({error})
        }
        forecast(lattitude, longitude,(error,forecastData)=>{
            if (error){
                console.log('Error in Forecast'+error)
                return res.send({error});
            }
            console.log('geocode : Success');
            res.send({
                Address: req.query.address,
                location: location,
                lattitude,
                longitude,
                forecast: forecastData.forecast
                
            })

        })
         
        
    })
    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

//start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is up on port - '+PORT)
})