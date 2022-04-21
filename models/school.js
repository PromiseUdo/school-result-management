const mongoose = require('mongoose')
const Schema = mongoose.Schema
//import every other model to the School model
const Session = require('./session')
const Student = require('./student')
const Classes = require('./class')
const Users = require('./users')
const Subjects = require('./subject')
const CheckerPin = require('./checkerPin')

const schoolSchema = new Schema({
  schoolName: {
    type: String,
  },
  schoolRegNo:{
    type:String,
  },
  logoUrl: {
    type: String,
  },
  schoolEmail: {
    type: String,
  },
  schoolMotto: {
    type: String,
  },
  schoolPhone: {
    type: String,
  },
  schoolAddress: {
    type: String,
  },
  Classes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
  Students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  Subjects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  Users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  checkerPins: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckerPin',
  },
})

module.exports = mongoose.model('School', schoolSchema)
