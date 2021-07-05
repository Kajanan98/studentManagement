const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    // if ((req.isAuthenticated())){
    //     res.locals.cat_id = req.user.cat_id;
    //     res.locals.name = req.user.name;
    //     res.locals.url = req.originalUrl;
    //     next();
    // } else {
    //     next();
    // }
    res.locals.cat_id = 6;
    res.locals.name = "Name";
    res.locals.url = req.originalUrl;
    next();
});

//landing page
router.get('/', (req, res) => {
    res.render('index')
})
router.use('/admin', require('./admin'))
router.use('/login', require('./login'))
router.use('/teacher', require('./teacher'))

module.exports = router