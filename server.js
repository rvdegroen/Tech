// this makes variables from .env file available in my code
require("dotenv").config();

// VARIABLES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Connection URL to my database
const url = process.env.DATABASE_URL;
mongoose.connect(url);

// CONFIGURATION
// app.set tells express that when I'm using templates, like ejs, it should look for them in the views folder
app.set("views", "./views");
// tells that while using templates, it should render them using ejs
app.set("view engine", "ejs");

// DATABASE CONFIGURATION
const dishesSchema = new mongoose.Schema({
  name: String,
  quality: Number,
  tags: [String],
  ingredients: [String],
  image: String,
});

// compile the schema into a model - because they're classes you write them with uppercase
const Dish = mongoose.model("dishes", dishesSchema);

// MIDDLEWARE
// express knows all of my static files are in my static folder
app.use(express.static("static"));
// to be able to use body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// ROUTES

// 1. homepage to show all dishes - NOT DONE
app.get("/", async (req, res) => {
  // find is static, because it's a property of the class (dishes) and not an instance (one dish with different values)
  const dishes = await Dish.find();
  console.log(dishes);

  res.render("pages/dishes", {
    dishes,
  });
});

// 2. page to add a dish to the database - NOT DONE
app.get("/add-dish", (req, res) => {
  res.render("pages/addDish");
});

// 2.1 page to add a dish to the database which then redirects you to the page of that dish
app.post("/add-dish", async (req, res) => {
  const newDish = new Dish({ name: req.body.dishName });
  const dishDatabase = await newDish.save();
  // eslint-disable-next-line no-underscore-dangle
  const dishId = dishDatabase._id;

  res.redirect("/dish/" + dishId);
});

// 3. detail page of the dish (or the dish you might have just added)
app.get("/dish/:dishId", async (req, res) => {
  const urlId = req.params.dishId;
  const specificDish = await Dish.findById(urlId);
  res.render("pages/dish", {
    specificDish,
  });
});

// 4. error 404 page for every route that doesn't exists
app.get("*", (req, res) => {
  res.render("pages/404");
});

// use the port on the env file if it exists, otherwise use port 3000
app.listen(process.env.PORT || 3000);
app.listen(8000);
