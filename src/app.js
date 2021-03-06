const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');



const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Shraddha Mukhedkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Shraddha Mukhedkar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        author: 'Shraddha Mukhedkar'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    //Calling geocode
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) { 
            return res.send({ error })
        }

        //call forecast
        forecast(latitude, longitude, (error, forecastData)=> {
            if (error) { 
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })  
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        author: 'Shraddha',
        errorText: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorText: 'A page you are looking for is not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})