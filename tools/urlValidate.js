const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)?/i
const regex = new RegExp(expression)

function urlValidate(url) { 
  return url.match(regex)
}

//https://newbedev.com/javascript-regex-link-code-example

module.exports = {urlValidate}