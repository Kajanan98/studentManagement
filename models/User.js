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

exports.deleteOne = (_id) => {
    return User.findOneAndDelete({ _id })
}

exports.findNotices = (author) => {
    return User.aggregate([
        {
            $match: {
                _id:mongoose.Types.ObjectId(author)
            }
        },
        {
            $lookup: {
                from: "notices",
                as: "_notice",
                localField: "_id",
                foreignField: "author"
            }
        }
    ])
}

exports.findComments = (author) => {
    return User.aggregate([
        {
            $match: {
                _id:mongoose.Types.ObjectId(author)
            }
        },
        {
            $lookup: {
                from: "comments",
                as: "_comment",
                localField: "_id",
                foreignField: "author"
            }
        }
    ])
}