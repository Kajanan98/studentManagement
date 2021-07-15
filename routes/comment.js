const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.get('/new',function(req,res) {
    res.render('comments/newComment',{
        title:'Add Comment',
        data:false,
        userId: req.user._id
    })
})

router.get('/:page',commentController.getAll);

router.post('/new',commentController.addComment);

router.get('/editSubmit/:id',commentController.viewEidtPage)

router.post('/editSubmit/:id',commentController.updateComment)

router.get('/delete/:id' , commentController.deleteOne)

module.exports = router