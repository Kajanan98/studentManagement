const express = require('express')
const router = express.Router()
//admin dashboard
router.get('/', async (req, res) => {
    var ob = await teacher.find()
    var total = ob.length
    res.render('adminDashboard', { teachersNum: total })
})

router.get('/test', async (req, res) => {
    //var ob  = await teacher.find()
    //var total = ob.length
    res.render('admin/', { result: [] })
})

router.get('/addTeacher', async (req, res) => {
    //var ob  = await teacher.find()
    //var total = ob.length
    res.render('admin/newUser', { title: 'New Teacher', data: [], brands: [] })
})

module.exports = router