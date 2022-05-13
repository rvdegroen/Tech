// this makes variables from .env file available in my code
require('dotenv').config()

////VARIABLES////
const express = require("express")
const app = express()

//connection to my mongoDB database

////CONFIGURATION////

//app.set tells express that when I'm using templates, like ejs, it should look for them in the views folder
app.set("views", "./views")
//tells that while using templates, it should render them using ejs
app.set("view engine", "ejs") 

////MIDDLEWARE////
//express knows all of my static files are in my static folder
app.use(express.static("static"))


////ROUTES////

//this is to render my dishes.js/homepage file
app.get("/", (req, res) => {
  res.render("pages/dishes", {
    //this is an object, in here I can define any variable that will be used in he template

    //totalDishes should actually be read from how many dishCard.ejs there are in the server
    totalDishes: 5,
  })
})

//this is to render my addDish.js file
app.get("/addDish", (req, res) => {
  res.render("pages/addDish", {
    //this is an object, in here I can define any variable that will be used in he template
  })
})

//error 404 page for every route that doesn't exists
app.get("*", (req, res) => {
  res.render ("pages/404")
  });

//localhost:3000
app.listen(3000)