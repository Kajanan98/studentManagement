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


router.get('/newNotice/new', function (req, res) {
    res.render('notices/newNotice', {
        title: 'Add Notice',
        data: false
    })
})

router.get('/viewNotice/:page', function (req, res) {
    var perPage = 6
    var page = req.params.page || 1
    Notice = [{ date: '2021-97-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-017-08', content: 'jwefwhefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }],
        count = Notice.length;
    res.render('notices/viewNotice', {
        title: 'View Notice',
        current: page,
        data: Notice.slice((perPage * page) - perPage, (perPage * page)),
        pages: Math.ceil(count / perPage)
    })


})




module.exports = router