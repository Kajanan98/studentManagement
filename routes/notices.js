const express = require('express')
const router = express.Router()
const noticeController = require('../controllers/noticeController')

router.get('/new',function(req,res) {
    res.render('notices/newNotice',{
        title:'Add Notice',
        data:false,
        userId: req.user._id
    })
})
router.get('/:page',noticeController.getAll);

router.post('/new',noticeController.addNotice);

router.get('/editSubmit/:id',noticeController.viewEidtPage)

router.post('/editSubmit/:id',noticeController.updateNotice)

router.get('/delete/:id' , noticeController.deleteOne)

module.exports = router