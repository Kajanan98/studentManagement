const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// router.get('/', userController.listAll)
router.get('/viewPrincipal', userController.listAllPrincipal)
router.get('/viewTeacher', userController.listAllTeacher)
router.get('/viewStudent', userController.listAllStudent)
router.get('/viewParent', userController.listAllParent)
router.get('/newUser', async (req, res) => {
    res.render('users/newUser', { title: 'New User', data: false })
})

router.get('/addTeacher', userController.addTeacher)
router.get('/addStudent', userController.addStudent)
router.get('/addParent', userController.addParent)

router.get('/editUser/:id', userController.findOne)
router.post('/newUser/new', userController.createUser);
router.post('/editUser/editSubmit/:id', userController.updateUser);
router.get('/delete/:id', userController.deleteOne)

router.post('/registerPrincipal', userController.registerPrincipal);

router.get('/profile/', userController.getProfile)
router.get('/profile/edit', userController.editProfilePage)
router.post('/profile/editSubmit', userController.updateProfile)

router.get('/manage', userController.manage)
router.get('/viewStudent/:studentId', userController.viewStudent)

module.exports = router