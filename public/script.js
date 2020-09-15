const searchElement = document.querySelector('[data-city-search]')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    const city = searchElement.value
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            city: city
        })
    }).then(res => res.json()).then(data => setWeather(data))
})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const windElement = document.querySelector('[data-wind]')
const humidityElement = document.querySelector('[data-humidity]')

function setWeather(data){
    if (!data.error){
        locationElement.textContent = `${data.name}, ${data.sys.country}`
        statusElement.textContent = data.weather[0].description
        temperatureElement.textContent = data.main.temp
        windElement.textContent = data.wind.speed + 'm/s'
        humidityElement.textContent = data.main.humidity + '%'
    } else {
        locationElement.textContent = 'Try Again'
        statusElement.textContent = data.message
        temperatureElement.textContent = 'TBD'
        windElement.textContent = 'TBD'
        humidityElement.textContent = 'TBD'
    }
    searchElement.value = ''
}