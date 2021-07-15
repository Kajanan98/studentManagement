const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.get('/new', commentController.newcomment)
router.get('/:page', commentController.viewComment)

module.exports = router