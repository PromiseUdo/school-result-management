const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Teachers = require('./teacher')
const Schema = mongoose.Schema

const classSchema = new mongoose.Schema({
  className: {
    type: String,
  },
  numOfStudents:{
      type:Number
  },
  classTeachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
  ],
})

module.exports = mongoose.model('Class', classSchema)
