const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const User = require('../models/users')
const School = require('../models/school')

module.exports.renderSignUp = (req, res) => {
  res.render('auth/signup')
}

module.exports.createNewUser = async (req, res) => {
  let {
    username,
    surname,
    firstname,
    middlename,
    gender,
    dob,
    weight,
    height,
    country,
    state,
    lga,
    address,
    subjectname,
    classname,
    phone,
    email,
    password,
    userPassword,
  } = req.body

  if (!password) {
    password = Math.random().toString(36).slice(-8)
  }

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  //validate if user already exists
  let user = await User.findOne({ email })

  if (user) {
    return res.status(422).json({ errors: [{ msg: 'User already exists' }] })
  }

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create new user
  user = new User({ ...req.body, password: hashedPassword })

  //assign role of teacher to those created by admin
  if (!req.body.password) {
    user.role = 'teacher'
    user.userPassword = password
  }

  await user.save()

  //create the JWT
  const payload = {
    user: {
      id: user.id,
      email: user.email,
    },
  }
  console.log(user, 'this is payload')
  //sign the JWT
  const token = await JWT.sign(payload, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: '3600s',
  })

  if (!req.body.password) {
    return res.redirect('/superadmin/add_teacher')
  }

  //store the JWT in the cookies
  res.cookie('token', token, {
    httpOnly: true,
  })
  return res.redirect('/superadmin/dashboard')
}

module.exports.renderSignIn = async (req, res) => {
  res.render('auth/signin')
}

module.exports.signin = async (req, res) => {
  const { schoolRegNo, email, password } = req.body

  //validate the user
  const user = await User.findOne({ email })
  const school = await School.findOne({ schoolRegNo })
  console.log(schoolRegNo, 'this is schoolRegNo')
  if (!user) {
    return res.status(422).json({ errors: [{ msg: 'Invalid credentials' }] })
  }

  if (!school) {
    return res
      .status(422)
      .json({ errors: [{ msg: 'The school ID is invalid' }] })
  }
  //validate the password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(422).json({ errors: [{ msg: 'Invalid credentials' }] })
  }

  //create the JWT
  const payload = {
    user: {
      id: user.id,
      email: user.email,
    },
  }

  //sign the JWT
  const token = await JWT.sign(payload, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: '3600s',
  })

  //store the JWT in the cookies
  res.cookie('token', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60), //expires in 1 hour
    httpOnly: true,
  })

  //create JWT for the school
  const schoolPayload = {
    school: {
      id: school.id,
      email: school.schoolEmail,
    },
  }
  console.log(school, 'school payload')
  //SIgn the jwt
  const schoolToken = await JWT.sign(
    schoolPayload,
    `${process.env.JWT_SECRET_KEY}`
  )

  //store the JWT in the cookies
  res.cookie('schoolToken', schoolToken, {
    httpOnly: true,
  })

  res.redirect('/superadmin/dashboard')
}

module.exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 1 })
  res.cookie('schoolToken', '', { maxAge: 1 })

  res.redirect('/auth/signin')
}
