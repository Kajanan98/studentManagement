const express = require('express')
const router = express.Router()
const childrenController = require('../controllers/childController')

router.get('/', childrenController.listAll)
router.get('/manage', childrenController.manage)
router.get('/manage/:parent', childrenController.manageOne)
router.post('/addStudent/:parent', childrenController.addStudent)
router.post('/removeStudent/:parent/:child', childrenController.removeStudent)

module.exports = router