const express = require('express')
const router = express.Router()
const classController = require('../controllers/classController')

router.get('/', classController.listAll)
router.get('/new', classController.newClass)
router.get('/edit/:id', classController.viewEidtPage)
router.post('/edit/:id', classController.updateDetails)
router.post('/addStudent/:classId', classController.addStudent)
router.post('/removeStudent/:classId', classController.removeStudent)
router.get('/delete/:id', classController.deleteOne)

module.exports = router