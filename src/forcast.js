const request = require("postman-request")

const getWeather = (latitude, longitude, callback) => {
    const URL = "http://api.weatherstack.com/current?access_key=cf9a76da42cc5c6f1554e5a5b01de9ea&query=" + latitude + "," + longitude

    request(URL, {json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to weather service", undefined)
        } else if(body.error) {
            callback(body.error.info, undefined)
        } else {
            const {weather_descriptions, temperature, feelslike, pressure} = body.current
            callback(undefined, {
                description: weather_descriptions[0],
                temperature,
                feelslike,
                pressure})
        }
    })
}

module.exports = getWeather