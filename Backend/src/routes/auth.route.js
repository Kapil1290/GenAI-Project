const express = require('express')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();


/**
 * @routes POST/api/auth 
 */
router.post('/register', authController.userRegister)

/**
 * @routes POST/api/auth
 * @use to login the user
 */
router.post('/login', authController.userLogin)

/**
 * @use to logout the account
 */
router.get('/logout', authController.userLogout)

/**
 * @name get api/auth/get-me
 * @description to get the current logged in user details
 * @access private
 */

router.get('/get-me',authMiddleware.authUser ,authController.getMeController)

module.exports = router;