const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendanceController')

router.get('/add', attendanceController.takeAttendanceClass)

module.exports = router