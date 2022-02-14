const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require("./geocode")
const getWeather = require("./forcast")

const app = express()

//Define path for express confir
const viewsPath = path.join(__dirname, "../src/templates/views")
const partialsPath = path.join(__dirname, "../src/templates/partials")
const directoryPath = path.join(__dirname, "../public")

// Setup handlebar engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(directoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Keith Farrell"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Keith Farrell"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Keith Farrell",
        message: "Welcome to the help page where we will look after your needs"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address"
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        } else {
            getWeather(latitude, longitude, (error, {description, temperature, feelslike} = {}) => {
                if(error) {
                    return res.send({ error })
                } else {
                    res.send({
                        location,
                        forcast: description + " with a current temperature of " + temperature + " degrees, that feels like " + feelslike + " degrees",
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Keith Farrell",
        message: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Keith Farrell",
        message: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server up on port 3000")
})