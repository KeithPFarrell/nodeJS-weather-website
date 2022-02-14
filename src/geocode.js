const request = require("postman-request")
const getWeather = require("./forcast")

const geoCode = (address, callback) => {
    const URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2VpdGhwZmFycmVsbCIsImEiOiJja3pjZ25oYm0waHlsMnBwODFtOG02MTJ0In0.uOY0tCXEsLq6ILLGxUPzbg&limit=1"

    request(URL, {json: true}, (error, {body}) => {
        if(error){
            callback("Cannot connect to geo-location service", undefined)
        } else if(body.features.length === 0) {
            callback("Did not receive a response for Geo Location", undefined)
        } else {
            /*getWeather({
                "latitude": response.body.features[0].center[1],
                "longitude": response.body.features[0].center[0],
                "location": response.body.features[0].place_name}, 
                callback)*/
            const {center, place_name: location} = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location})
        }
    })
}

module.exports = geoCode