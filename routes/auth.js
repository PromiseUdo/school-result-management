const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../controllers/auth')

router.route('/signup')
    .get(auth.renderSignUp)
    .post(auth.createNewUser)



module.exports = router
