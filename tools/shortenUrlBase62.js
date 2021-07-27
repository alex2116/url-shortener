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

module.exports = { shortenUrlBase62 }