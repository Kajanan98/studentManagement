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
    }
})

const ExtracurricularActivity = mongoose.model('Extracurricularactivity', ExtracurricularActivityShema)

exports.addExtracurricularActivity = (author, towhom, content, date) => {
    const extracurricularActivity = new ExtracurricularActivity({ author, towhom, content, date });
    return extracurricularActivity.save()
}

exports.updateExtracurricularActivity = (id, towhom, content, date) => {
    return ExtracurricularActivity.updateOne(
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

exports.getAllActivities = () => {
    return ExtracurricularActivity.aggregate([
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

exports.getStudentActivity = (id) => {
    return ExtracurricularActivity.aggregate([
        {
            $match: { towhom: mongoose.Types.ObjectId(id) }
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
                authorDetail: { $arrayElemAt: ["$authorDetail", 0] },
            }
        }
    ])
}