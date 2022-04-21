const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = new mongoose.Schema({
  session: {
    type: String,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
  // term: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Term',
  //   },
  // ],
})

module.exports = mongoose.model('Session', sessionSchema)
