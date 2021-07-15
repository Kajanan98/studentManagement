const express = require('express')
const router = express.Router()
const noticeController = require('../controllers/noticeController')

router.get('/', noticeController.listAll)
router.get('/new', noticeController.viewNewPage)
router.get('/:page', noticeController.getAll);
router.post('/new', noticeController.addNotice);
router.get('/editSubmit/:id', noticeController.viewEidtPage)
router.post('/editSubmit/:id', noticeController.updateNotice)
router.get('/delete/:id', noticeController.deleteOne)

module.exports = router