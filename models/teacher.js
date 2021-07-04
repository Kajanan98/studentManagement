const mongoose = require('mongoose')
const teacher = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    NIC:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    joinedDate:{
        type:Date,
        required:true
    },
    oldSchool:{
        type:String,
    },
    class:{
        type:String,
    },
    description:{
        type:String,
    }
})

module.exports = mongoose.model('Teacher',teacher)