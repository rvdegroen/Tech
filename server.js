////VARIABLES////

const express = require("express")
const app = express()

// temporary data for testing: array of objects of each dish
const database = [
  {
    dishName: "Thai green curry",
    dishIngredients: "coconut milk, sugar, chicken, fish sauce",
    dishQuality: 3,
    dishId: 1,
  },
  {
    dishName: "Spring rolls with peanut sauce",
    dishIngredients: "thin rice noodles, butter lettuce, red cabbage",
    dishQuality: 2,
    dishId: 2,
  },
  {
    dishName: "Chinese dumplings",
    dishIngredients: "sesame oil, leafz vegetable, ground pork",
    dishQuality: 1,
    dishId: 3,
  },
  {
    
  }
]

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

//this is to render a dish.js file, which is different depending on the id information 
//:dishId is a parameter/variable with a value for a dish (see dishes.ejs & dishCard.ejs). I want to use dishId to show the right page for dish
app.get("/dishes/:dishId", (req,res) => {
  //1. save the id in a variable, from the url as a NUMBER, because an url is a string & put number before (req.params.dishId)
  //req.params.[VARIABLE] = searches the url path for the specified parameter
  const dishIdUrl = Number(req.params.dishId)
  //2. find the dish information using the id 
  const dish = database.find((oneOfDishes) => dishIdUrl === oneOfDishes.dishId)
  // 3. send the dish information to the template
  res.render("pages/dish", {
    dishName: dish.dishName,
    dishIngredients: dish.dishIngredients,
    dishQuality: dish.dishQuality,
  })
})

//error 404 page for every route that doesn't exists
app.get("*", (req, res) => {
  res.render ("pages/404")
  });

//localhost:3000
app.listen(3000)