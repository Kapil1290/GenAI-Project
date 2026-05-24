const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const interviewRouter = express.Router();
const interviewController = require('../controllers/interview.controller')
const fileMiddleware = require('../middlewares/file.middleware')

/**
 * @route Post api/interview
 * @access public
 * @description generate new interview report on the basis of user self description resume pdf and job description
 */

interviewRouter.post('/', authMiddleware.authUser, fileMiddleware.single('resume') , interviewController.generateInterviewReportController)


module.exports = interviewRouter;