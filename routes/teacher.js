const express = require('express')
const router = express.Router()
const teacher = require('../models/teacher')

//add new teacher page
router.get('/new', (req, res) => {
    res.render('teacherSignUp')
})

//teacher sign up
router.post('/new', async (req, res) => {
    console.log(req.body)
    var ob = new teacher({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        mobile: req.body.mobile,
        oldSchool: req.body.oldSchool,
        password: req.body.password,
        NIC: req.body.NIC,
        class: req.body.class,
        joinedDate: req.body.joinedDate,
        description: req.body.description
    })
    await ob.save()
    res.redirect('/admin')
})

//view all teachers
router.get('/all', async (req, res) => {
    var ob = await teacher.find()
    res.render('teachers', { teachers: ob })
})

//delete teachers
router.get('/delete/:id', async (req, res) => {
    await teacher.findByIdAndRemove(req.params.id)
    res.redirect('/teacher/all')
})

module.exports = router