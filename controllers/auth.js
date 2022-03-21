const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const User = require('../models/users')

module.exports.renderSignUp = (req, res) => {
  res.render('auth/signup')
}

module.exports.createNewUser = async (req, res) => {
  const { username, email, password } = req.body

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
  user = new User({
    username,
    email,
    password: hashedPassword,
  })
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

  //store the JWT in the cookies
  res.cookie('token', token, {
    httpOnly: true,
  })
  return res.redirect('/superadmin/dashboard')
}

module.exports.signin = async (req, res) => {
  const { email, password } = req.body

  //validate the user
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(422).json({ errors: [{ msg: 'Invalid credentials' }] })
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

  res.redirect('/superadmin/dashboard')
}

module.exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 1 })
  res.redirect('/')
}
