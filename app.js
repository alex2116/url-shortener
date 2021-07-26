const express = require('express')
const mongoose = require('mongoose')

require('./config/mongoose')

const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(3000, () => {
  console.log('App is running on port 3000')
})