const express = require('express')
const router = express.Router()
const timetableController = require('../controllers/timetableController')

router.get('/', timetableController.viewTimeTable)
router.get('/new', timetableController.newTimetableSelectClass)
router.get('/new/:classId', timetableController.initiateTimetable)
router.get('/list', timetableController.listAllTimetables)
router.get('/delete/:id', timetableController.deleteTimetable)
router.get('/:id/edit', timetableController.viewEditPage)
router.post('/:id', timetableController.updateTimetable)

module.exports = router