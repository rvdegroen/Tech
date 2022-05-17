// this makes variables from .env file available in my code
require("dotenv").config();

// VARIABLES
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

// Connection URL to my database
const url = process.env.DATABASE_URL;
const client = new MongoClient(url);
client.connect();

// CONFIGURATION
// app.set tells express that when I'm using templates, like ejs, it should look for them in the views folder
app.set("views", "./views");
// tells that while using templates, it should render them using ejs
app.set("view engine", "ejs");

// MIDDLEWARE
// express knows all of my static files are in my static folder
app.use(express.static("static"));

// FUNCTIONS

// test function to find one specific dish
const getDishes = async () => {
  // open database dishExchange
  const database = client.db("dishExchange");
  const dishes = database.collection("dishes");

  // to find one specific dish
  const query = { name: "Thai green curry" };
  const dish = await dishes.findOne(query);

  console.log(dish);
};

// ROUTES

// 1. homepage to show all dishes
app.get("/", (req, res) => {
  res.render("pages/dishes");
});

// 2. page to add a dish to the database
app.get("/add-dish", (req, res) => {
  res.render("pages/addDish");
});

// 3. detail page of the dish (or the dish you might have just added)
app.get("/dish/:dishId", (req, res) => {
  res.render("pages/dish");
});

// 4. error 404 page for every route that doesn't exists
app.get("*", (req, res) => {
  getDishes();
  res.render("pages/404");
});

// use the port on the env file if it exists, otherwise use port 3000
// app.listen(process.env.PORT || 3000);
app.listen(8000);
