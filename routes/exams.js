const express = require('express')
const router = express.Router()
const examController = require('../controllers/examController')

router.get('/', examController.listAll)
router.get('/manage', examController.manage)
router.get('/new', examController.initiate)
router.get('/edit/:id', examController.viewEidtPage)
router.post('/edit/:id', examController.update)
router.get('/delete/:id', examController.deleteOne)
router.get('/results', examController.resultSelectExam)
router.get('/results/:examId', examController.findWithResult)
router.get('/addResult', examController.addResultSelectExam)
router.get('/addResult/:examId', examController.initiateResult)
router.get('/resultItem/:resId', examController.viewResultItem)
router.post('/resultItem/:resId', examController.updateResult)
router.get('/resultsList', examController.resultsList)

module.exports = router