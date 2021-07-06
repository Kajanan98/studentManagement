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

const User = mongoose.model('User', UserSchema);


exports.createUser = (name, address, mobile, NIC, username, password, type) => {
    const user = new User({
        name, address, mobile, NIC, username, password, type
    })
    return user.save()
}

exports.findOne = (username) => {
    return User.findOne({ username })
}

exports.updateUser = (name, address, mobile, NIC, password, type) => {
    return User.updateOne({ username }, {
        $set: { name, address, mobile, NIC, password, type }
    })
}