const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const studentSchema = new mongoose.Schema({
  passportUrl: {
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
    enum: ['Male', 'Female'],
  },
  dob: {
    type: Date,
  },
  weight: {
    type: Number,
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
  sportHouse: {
    type: String,
  },
  hobbies: {
    type: String,
  },
  disabilities: {
    type: String,
  },
})

studentSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Student', studentSchema)
