const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Student = require('./student')
const School = require('./school')

const checkerPinSchema = new Schema({
  pin: {
    type: String,
  },
  pinSession: {
    type: String,
  },
  pinStatus: {
    type: String,
  },
  useCount: {
    type: Number,
  },
  studentAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
})

module.exports = mongoose.model('CheckerPin', checkerPinSchema)
