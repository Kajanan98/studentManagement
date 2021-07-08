const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
//admin dashboard
// router.get('/', async (req, res) => {
//     var ob = await teacher.find()
//     var total = ob.length
//     res.render('adminDashboard', { teachersNum: total })
// })

router.get('/', async (req, res) => {
    res.render('admin/', { result: [] })
})
router.get('/newUser', async (req, res) => {
    res.render('admin/newUser', { title: 'New User', data: false })
})

router.get('/addTeacher', async (req, res) => {
    res.render('admin/newUser', { title: 'New Teacher', data: [], brands: [] })
})

router.get('/editUser/:id', userController.findOne)
router.post('/newUser/new', userController.createUser);
router.post('/editUser/editSubmit/:id', userController.updateUser);

router.get('/newClass', userController.getUsers)
router.get('/jjj', userController.getUsers)

module.exports = router