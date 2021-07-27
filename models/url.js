const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  url: {
    type: String,
    trim: true
  },
  code: {
    type: String,
    trim: true
  }
})
module.exports = mongoose.model('URL', urlSchema)