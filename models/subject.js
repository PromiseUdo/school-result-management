const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Teachers = require('./teacher')
const Schema = mongoose.Schema

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
  ],
})

module.exports = mongoose.model('Subject', subjectSchema)
