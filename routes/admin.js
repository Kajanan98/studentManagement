const express = require('express')
const router = express.Router()
const teacher = require('../models/teacher')
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

module.exports = router