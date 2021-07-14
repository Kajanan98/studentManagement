const mongoose = require('mongoose')

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

exports.listAll = () => {
    return User.find()
}

exports.createUser = (name, address, mobile, NIC, username, password, type) => {
    const user = new User({
        name, address, mobile, NIC, username, password, type
    })
    return user.save()
}

exports.findOne = (username) => {
    return User.findOne({ username })
}


exports.getUsers = () => {
    return User.find()
}

exports.updateUser = (username, name, address, mobile, NIC, password, type) => {
    return User.updateOne({ username }, {
        $set: { name, address, mobile, NIC, password, type }
    })
}

exports.findByUsername = (username) => {
    return User.findOne({ username })
}

exports.getUserByID = (id) => {
    return User.findById(id)
}

exports.getStudents = () => {
    return User.find({ type: 'student' })
}

exports.getTeachers = () => {
    return User.find({ type: 'teacher' })
}

// exports.markAttendance = (date, students) => {
//     const bulkOpt = students.map(({ studentId, attendance }) => ({
//         updateOne: {
//             "filter": { _id: mongoose.Types.ObjectId(studentId) },
//             "update": {
//                 $push: {
//                     attendance: { date, attendance }
//                 }
//             }
//         }
//     }))
//     return User.bulkWrite(bulkOpt)
// }