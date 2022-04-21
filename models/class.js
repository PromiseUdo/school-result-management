const mongoose = require('mongoose')
const Teachers = require('./users')
const Schema = mongoose.Schema

const classSchema = new mongoose.Schema({
  className: {
    type: String,
  },
  numOfStudents: {
    type: Number,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
  classTeachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
  ],
})

module.exports = mongoose.model('Class', classSchema)
