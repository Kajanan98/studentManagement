const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendanceController')

router.get('/', attendanceController.viewAttendanceClass)
router.get('/view/:classId', attendanceController.viewAttendance)
router.get('/history/', attendanceController.viewHistoryClass)
router.get('/history/:classId', attendanceController.viewHistory)
router.get('/add', attendanceController.takeAttendanceClass)
router.get('/add/:classId', attendanceController.takeAttendance)
router.post('/add/:classId', attendanceController.markAttendance)
router.get('/edit/:attId', attendanceController.viewEditPage)
router.post('/editDate/:attId', attendanceController.updateAttendanceDate)
router.get('/editRecord/:recId/:attendance/:attId', attendanceController.updateAttendanceRecord)
router.get('/forOneStudent/:studentId', attendanceController.forOneStudent)
router.get('/forOneStudent/', attendanceController.SelectChild)

module.exports = router