const express = require('express')
const router = express.Router()
const examController = require('../controllers/examController')

router.get('/', examController.listAll)
router.get('/new', examController.initiate)
router.get('/edit/:id', examController.viewEidtPage)
router.post('/edit/:id', examController.update)
router.get('/delete/:id', examController.deleteOne)
// router.get('/newexam', async (req, res) => {
//     res.render('exams/newexam', { title: 'New exam', data: false })
// })

// router.get('/addTeacher', async (req, res) => {
//     res.render('exams/newexam', { title: 'New Teacher', data: [], brands: [] })
// })

// router.get('/editexam/:id', examController.findOne)
// router.post('/newexam/new', examController.createexam);
// router.post('/editexam/editSubmit/:id', examController.updateexam);

module.exports = router