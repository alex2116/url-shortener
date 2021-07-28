const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const routes = require('./routes')

const PORT = process.env.PORT || 3000

require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log('App is running on http://localhost:${PORT}')
})




