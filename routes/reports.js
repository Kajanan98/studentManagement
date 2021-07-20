const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendanceController')
const examController = require('../controllers/examController')

router.get('/attendances', attendanceController.viewAttendanceClassReport)
router.get('/attendances/:classId', attendanceController.viewAttendanceReport)
router.get('/results', examController.resultSelectExamReport)
router.get('/results/:examId', examController.findWithResultReport)

module.exports = router