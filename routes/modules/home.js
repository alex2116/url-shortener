const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const { urlValidate } = require('../../tools/urlValidate')
const { shortenUrlBase62 } = require('../../tools/shortenUrlBase62')



router.get('/', (req, res) => {
  res.render('index', { input: true })
})

router.post('/', async (req, res) => {
  const url = req.body.url
  const protocol = req.protocol
  const host = req.headers.host
  const homepage = `${protocol}://${host}/`

  if (!urlValidate(url)) { //如果不符合function urlValidate
    return res.render('index', { input: true, errorMessage: 'Please enter valid URL' })
  }

  const shortUrl = await Url.find({ url }).lean()

  if (shortUrl.length) { //如果shortUrl有成立，就會變成 if(true)
    return res.render('index', {
      result: true,
      shortUrl: `${protocol}://${host}/${shortUrl[0].code}`,
      homepage
    })
  }

  let code = shortenUrlBase62()
  let checkCode = await Url.find({ code }).lean() //尋找資料庫內是否已經出現過此短代碼
  while (checkCode.length) { //如果已經出現過，checkcode就會成立
    code = shortenUrlBase62()
    checkCode = await Url.find({ code }).lean()
  }

  const newUrl = new Url({ url, code })
  await newUrl.save()
  res.render('index', { result: true, shortUrl: `${protocol}://${host}/${code}`, homepage })
})

router.get('/:code', async (req, res) => {
  const code = req.params.code
  const protocol = req.protocol
  const host = req.headers.host
  const homepage = `${protocol}://${host}/`
  const result = await Url.find({ code }).lean()
  
  if (!result.length) {
    return res.render('wrongShortenUrl', { homepage })
  }
  res.render('convert', { result: result[0] })
})

module.exports = router