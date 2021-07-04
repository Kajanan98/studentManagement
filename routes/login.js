const express = require('express')
const router = express.Router()

//admin login page
router.get('/admin',(req,res)=>{
    res.render('adminLogin')
})

//admin login
router.post('/admin',(req,res)=>{
    if(req.body.email=='admin@gmail.com' && req.body.password=='123'){
        res.redirect('/admin')
    }else{
        res.redirect('/login/admin')
    }
})



module.exports = router