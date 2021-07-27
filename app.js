const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Url = require('./models/url')
require('./config/mongoose')

const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.render('index', { input: true })
})

app.post('/', async (req, res) => {
  const url = req.body.url

  if (!urlValidate(url)) {
    return res.render('index', { input: true, errorMessage: 'Please enter valid URL' })
  }

  const shortUrl = await Url.find({ url }).lean()
    
  if (shortUrl.length) { //如果shortUrl有成立，就會變成 if(true)
    return res.render('index', {
      result: true,
      shortUrl: `http://localhost:3000/${shortUrl[0].code}`
    })
  }   
  
  let code = shortenUrlBase62()
  let checkCode = await Url.find({ code }).lean()
  while (checkCode.length) {
    shorten = shortenUrlBase62()
    checkCode = await Url.find({ code }).lean()
  }

  const newUrl = new Url({ url, code })
  await newUrl.save()
  res.render('index', { result: true, shortUrl: `http://localhost:3000/${code}`})
    
})
  
app.get('/:code', (req, res) => {
  const code = req.params.code
  Url.find({ code })
    .lean()
    .then(result => {
      res.render('convert', { result: result[0] })
    })
})

app.listen(3000, () => {
  console.log('App is running on port 3000')
})

const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)?/i
const regex = new RegExp(expression)

function urlValidate(url) { //https://newbedev.com/javascript-regex-link-code-example
  return url.match(regex)
} 


const base62 = require('base62/lib/ascii')

function shortenUrlBase62(shortenLength = 5) {
  const container = []
  for (let i = 0; i < shortenLength; i++) {
    container.push(Math.floor(Math.random() * 62))
  }
  let shorten = ''
  container.forEach(num => {
    shorten += base62.encode(num)
  })
  return shorten
}