const express = require('express')
const router = express.Router()
const extracurricularActivityController = require('../controllers/extracurricularActivityController')
const User = require('../models/User')

router.get('/new', async (req, res) => {
    const students = await User.getStudents();
    res.render('activity/newActivity', {
        title1: 'Add Extracurricular Activity',
        data: false,
        userId: req.user._id,
        students
    })
})

// router.get('/:page', extracurricularActivityController.getAll);
router.post('/new', extracurricularActivityController.add);
router.get('/view', extracurricularActivityController.get);
router.get('/viewStudent', extracurricularActivityController.getStudent);
router.get('/delete/:id', extracurricularActivityController.deleteOne)
router.get('/edit/:id', extracurricularActivityController.viewEidtPage)
router.post('/editSubmit/:id', extracurricularActivityController.update)



module.exports = router