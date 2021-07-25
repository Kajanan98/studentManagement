const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExtracurricularActivityShema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    towhom: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    content: {
        type: String
    },
    type: {
        type: String,
        enum: ['activity', 'punishment'],
        default: 'activity'
    }
})

const ExtracurricularActivity = mongoose.model('Extracurricularactivity', ExtracurricularActivityShema)

exports.addExtracurricularActivity = (author, towhom, content, date, type) => {
    const extracurricularActivity = new ExtracurricularActivity({ author, towhom, content, date, type });
    return extracurricularActivity.save()
}

exports.updateExtracurricularActivity = (id, towhom, content, date) => {
    return ExtracurricularActivity.findOneAndUpdate(
        { _id: id },
        {
            $set: { id, towhom, content, date }
        }
    )
}

exports.findOne = (id) => {
    return ExtracurricularActivity.findById(id)
}

exports.deleteOne = (_id) => {
    return ExtracurricularActivity.findOneAndDelete({ _id })
}

exports.getAllActivities = (type) => {
    return ExtracurricularActivity.aggregate([
        {
            $match: {
                type
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "towhom",
                foreignField: "_id",
                as: "studentDetail"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authorDetail"
            }
        },
        {
            $addFields: {
                studentDetail: { $arrayElemAt: ["$studentDetail", 0] },
                authorDetail: { $arrayElemAt: ["$authorDetail", 0] },
            }
        }
    ])
}

exports.getStudentActivity = (id, type) => {
    return ExtracurricularActivity.aggregate([
        {
            $match: { towhom: mongoose.Types.ObjectId(id), type }
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authorDetail"
            }
        },
        {
            $project: {
                date: 1,
                content: 1,
                type: 1,
                authorDetail: { $arrayElemAt: ["$authorDetail", 0] },
            }
        }
    ])
}