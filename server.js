const express = require('express')
const app = express()

//tells express that when I'm using templates, like ejs, it should look for them in the views folder
app.set('views', './views')
//tells that while using templates, it should render them using ejs
app.set('view engine', 'ejs') 

//express knows that now all of my static files are in my static folder
//to use paths in my html, I can put a / behind the path to folder
app.use(express.static("static"))

//to render the index.ejs file
app.get('/', function (req, res) {
  res.render("pages/index")
})

//localhost:3000
app.listen(3000)