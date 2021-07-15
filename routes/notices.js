const express = require('express')
const router = express.Router()
const noticeController = require('../controllers/noticeController');

router.get('/new', noticeController.newNotice)
router.get('/:page', noticeController.viewNotice)

module.exports = router