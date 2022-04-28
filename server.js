const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Wwwworlddd')
})

app.listen(8080) 

//werkt automatisch vanwege nodemon