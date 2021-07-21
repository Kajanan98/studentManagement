const express = require('express')
const router = express.Router()
const childrenController = require('../controllers/childController')

router.get('/', childrenController.listAll)
router.get('/new', childrenController.newChild)
router.get('/edit/:id', childrenController.viewEidtPage)
router.post('/edit/:id', childrenController.updateDetails)
router.post('/addStudent/:classId', childrenController.addStudent)
router.post('/removeStudent/:classId', childrenController.removeStudent)
//router.get('/delete/:id', childrenController.deleteOne)

module.exports = router