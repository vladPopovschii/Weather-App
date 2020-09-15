if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${WEATHER_API_KEY}&units=metric`

    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data))
    .catch(error => {res.json({message: 'We did not found this location', error: true})})

})

app.listen(3000, () => {
    console.log('Server Started')
})