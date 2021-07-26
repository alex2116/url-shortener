const express = require('express')
const exphbs =require('express-handlebars')
const mongoose = require('mongoose')

require('./config/mongoose')

const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})


app.listen(3000, () => {
  console.log('App is running on port 3000')
})