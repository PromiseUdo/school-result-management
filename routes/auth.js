const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../controllers/auth')
const { check, validationResult } = require('express-validator')

router
  .route('/signup')
  .get(auth.renderSignUp)
  .post(
    [
      check('email', 'Please provide a valid email').isEmail(),
      check(
        'password',
        'Please provide password with at least 6 characters'
      ).isLength({
        min: 6,
      }),
    ],
    auth.createNewUser
  )

router.route('/signin').post(auth.signin)

router.route('/logout').get(auth.logout)

module.exports = router
