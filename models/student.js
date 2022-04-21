const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CheckerPin = require('./checkerPin')

const studentSchema = new mongoose.Schema({
  passportUrl: {
    type: String,
  },
  username: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  middlename: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  dob: {
    type: Date,
  },
  weight: {
    type: Number,
  },
  feeStatus: {
    type: String,
  },
  height: {
    type: Number,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  lga: {
    type: String,
  },
  address: {
    type: String,
  },
  parentName: {
    type: String,
  },
  relationship: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  formerSchool: {
    type: String,
  },
  startYear: {
    type: Number,
  },
  endYear: {
    type: Number,
  },
  regClass: {
    type: String,
  },
  currClass: {
    type: String,
  },
  sportHouse: {
    type: String,
  },
  hobbies: {
    type: String,
  },
  disabilities: {
    type: String,
  },
  studentPin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CheckerPin',
  },
  numPinUsed: {
    type: Number,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
})

module.exports = mongoose.model('Student', studentSchema)
