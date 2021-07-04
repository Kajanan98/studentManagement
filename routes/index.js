const express = require('express')
const router = express.Router()

//landing page
router.get('/', (req, res) => {
    res.render('index')
})
router.use('/admin', require('./admin'))
router.use('/login', require('./login'))
router.use('/teacher', require('./teacher'))

module.exports = router