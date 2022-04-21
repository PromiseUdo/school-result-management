const express = require('express')
const router = express.Router({ mergeParams: true })
const account = require('../controllers/account')

router
  .route('/register')
  .get(account.renderAccountRegistration)
  .post(account.createNewSchool)

module.exports = router
