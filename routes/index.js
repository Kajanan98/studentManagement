const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

//landing page
router.get('/', (req, res) => {
    res.render('index', { teachersNum: 10 })
})
router.get('/login', authController.viewLogin)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.use((req, res, next) => {
    if ((req.isAuthenticated())) {
        res.locals.type = req.user.type;
        res.locals.name = req.user.name;
        res.locals.url = req.originalUrl;
        next();
    } else {
        res.locals.type = 6;
        res.locals.name = '';
        res.locals.url = req.originalUrl;
        next();
    }
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})
router.use('/admin', require('./admin'))
router.use('/users', require('./users'))
router.use('/classes', require('./classes'))
router.use('/attendance', require('./attendance'))
router.use('/exams', require('./exams'))
router.use('/teacher', require('./teacher'))
router.use('/notices', require('./notices'))
router.use('/comments', require('./comment'))

module.exports = router