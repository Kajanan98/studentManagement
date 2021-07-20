const express = require('express')
const router = express.Router()
const reportsController = require('../controllers/reportsController')

router.get('/attendances', reportsController.viewAttendanceClassReport)
router.get('/attendances/:classId', reportsController.viewAttendanceReport)
router.get('/results', reportsController.resultSelectExamReport)
router.get('/results/:examId', reportsController.findWithResultReport)

module.exports = router