const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const User = require('../models/users')
const School = require('../models/school')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

module.exports.renderAccountRegistration = (req, res) => {
  res.render('register/index')
}

module.exports.createNewSchool = async (req, res) => {
  let {
    schoolName,
    schoolMotto,
    schoolEmail,
    schoolPhone,
    password,
    retypePassword,
    schoolLogo,
    schoolAddress,
  } = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  let school = await School.findOne({ schoolEmail })
  if (school) {
    return res.status(422).json({ errors: [{ msg: 'User already exists' }] })
  }
  //hash school password
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)

  school = new School({ ...req.body })

  uniqueID = `NP${Math.floor(Math.random() * 1000000) + 10000}`

  console.log(uniqueID)
  school.schoolRegNo = uniqueID

  console.log(school.RegNo)

  await school.save()

  //create JWT
  const payload = {
    school: {
      id: school.id,
      email: school.schoolEmail,
    },
  }
  console.log(school, 'school payload')
  //SIgn the jwt
  const schoolToken = await JWT.sign(payload, `${process.env.JWT_SECRET_KEY}`)

  //store the JWT in the cookies
  res.cookie('schoolToken', schoolToken, {
    httpOnly: true,
  })

  return res.redirect('/auth/signup')
}
