const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.listAll)
router.get('/newUser', async (req, res) => {
    res.render('users/newUser', { title: 'New User', data: false })
})

router.get('/addTeacher', userController.addTeacher)
router.get('/addStudent', userController.addStudent)
router.get('/addParent', userController.addParent)

router.get('/editUser/:id', userController.findOne)
router.post('/newUser/new', userController.createUser);
router.post('/editUser/editSubmit/:id', userController.updateUser);

router.post('/registerPrincipal', userController.registerPrincipal);
router.get('/profile/', userController.getProfile)
router.get('/delete/:id', userController.deleteOne)
router.get('/profile/edit', userController.editProfilePage)
router.post('/profile/editSubmit', userController.updateProfile)

module.exports = router