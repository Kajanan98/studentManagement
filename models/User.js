const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    attendance: {
        type: Boolean,
        default: false
    }
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['principal', 'teacher', 'student', 'parent'],
        default: 'student'
    },
    attendance: [AttendanceSchema]
    // joinedDate:{
    //     type:Date,
    //     required:true
    // },
    // class:{
    //     type:String,
    // },
    // description:{
    //     type:String,
    // }
})

module.exports = mongoose.model('User', UserSchema)