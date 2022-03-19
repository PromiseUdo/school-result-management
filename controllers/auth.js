const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

module.exports.renderSignUp = (req, res) => {
  res.render('auth/signup')
}
;(module.exports.createNewUser = [
  check('email', 'Please provide a valid email').isEmail(),
  check(
    'password',
    'Please provide password with at least 6 characters'
  ).isLength({
    min: 6,
  }),
]),
  async (req, res) => {
    const {username, email, password} = req.body

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }

    




  }
