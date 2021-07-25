const express = require('express')
const router = express.Router()
const extracurricularActivityController = require('../controllers/extracurricularActivityController')
const User = require('../models/User')

router.get('/new/:type', extracurricularActivityController.viewNewPage)
router.post('/new', extracurricularActivityController.add);
router.get('/view/:type', extracurricularActivityController.get);
router.get('/viewStudent', extracurricularActivityController.getStudent);
router.get('/delete/:id', extracurricularActivityController.deleteOne)
router.get('/edit/:id', extracurricularActivityController.viewEidtPage)
router.post('/editSubmit/:id', extracurricularActivityController.update)



module.exports = router