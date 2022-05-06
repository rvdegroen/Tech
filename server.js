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
  }
]

///////////////////////////////////////
/////////////CONFIGURATION/////////////
///////////////////////////////////////

//app.set tells express that when I'm using templates, like ejs, it should look for them in the views folder
app.set("views", "./views")
//tells that while using templates, it should render them using ejs
app.set("view engine", "ejs") 

//////////////////////////////////////
//////////////MIDDLEWARE//////////////
//////////////////////////////////////

//express knows that now all of my static files are in my static folder
//to use paths in my html, I can put a / behind the path to folder
app.use(express.static("static"))

//////////////////////////////////////
////////////////ROUTES////////////////
//////////////////////////////////////

//this is to render my index.js file
app.get("/", (req, res) => {
  res.render("pages/dishes", {
    //this is an object, in here I can define any variable that will be used in he template
    numberOfDishes: 2,
  })
})

//dishId is a variable with a value every dish has (look at dishes.ejs), : is for parameters
app.get("/dishes/:dishId", (req, res) => {
  // 1. save the id in a variable (from the url) as a NUMBER (url is a string so put number before req.params.dishId)
  const dishIdFromUrl = Number(req.params.dishId)

  // 2. find the dish information using the id
  const dish = database.find((oneOfTheDishes) => dishIdFromUrl === oneOfTheDishes.dishId)

  /* "simpler" way to write this code:
    const dish = database.find(function (oneOfTheDishes) {
      if (dishId === oneOfTheDishes.dishId) return true;
      return false;
    })

    let foundDish;
    for (let dish of database){
      if (dishIdFromUrl === dish.dishId) {
        foundDish = dish
      }
    }
  */

  // 3. send the dish information to the template
  res.render("pages/dish", {
    dishName: dish.dishName,
    dishIngredients: dish.dishIngredients,
    dishQuality: dish.dishQuality,
  })
})

//localhost:3000
app.listen(3000)