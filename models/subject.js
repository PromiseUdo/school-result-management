const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Teachers = require('./users')
const Schema = mongoose.Schema

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
  ],
})

module.exports = mongoose.model('Subject', subjectSchema)
