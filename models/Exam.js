const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ExamResultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    result: {
        type: Number,
        default: 0
    }
})


const ExamSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    subject: {
        type: String,
        default: ''
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classes'
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    results: [ExamResultSchema]
})

const Exam = mongoose.model('Exam', ExamSchema)

exports.listAll = () => {
    return Exam.aggregate([
        {
            $lookup: {
                from: "classes",
                as: '_class',
                localField: 'classId',
                foreignField: '_id'
            }
        },
    ])
}

exports.initiate = (classId) => {
    const exam = new Exam({ classId });
    return exam.save()
}

exports.update = (id, date, subject, classId, isFinished) => {
    return Exam.updateOne(
        { _id: id },
        {
            $set: { id, date, subject, classId, isFinished }
        }
    )
}

exports.findOne = (id) => {
    return Exam.findById(id)
}

exports.deleteOne = (_id) => {
    return Exam.findOneAndDelete({ _id })
}

exports.findWithResult = id => {
    return Exam.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'results.studentId',
                foreignField: '_id',
                as: '_students'
            }
        },
        {
            $addFields: {
                results: {
                    $map: {
                        input: '$results',
                        as: 'res',
                        in: {
                            $mergeObjects: [
                                {
                                    $arrayElemAt: [
                                        { $filter: { input: "$_students", cond: { $eq: ["$$this._id", "$$res.studentId"] } } }
                                        , 0
                                    ]
                                },
                                "$$res"
                            ]
                        }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "classes",
                localField: 'classId',
                foreignField: '_id',
                as: '_class',
            }
        },
    ])
}

exports.initiateResult = (examId, studentId) => {
    return Exam.findOneAndUpdate(
        {
            _id: mongoose.Types.ObjectId(examId)
        },
        {
            $push: {
                results: {
                    studentId
                }
            }
        },
        {
            new: true
        }
    ).then(doc => {
        return doc.results[doc.results.length - 1]
    })
}

exports.addResultItem = (examId, studentId, result) => {
    return Exam.findOneAndUpdate(
        {
            _id: mongoose.Types.ObjectId(examId)
        },
        {
            $push: {
                results: {
                    studentId, result
                }
            }
        },
        {
            new: true
        }
    ).then(doc => {
        return doc.results[doc.results.length - 1]
    })
}

exports.deleteResult = (resultId) => {
    return Exam.findOneAndUpdate(
        {
            'results._id': mongoose.Types.ObjectId(resultId)
        },
        {
            $pull: {
                results: {
                    _id: resultId
                }
            }
        },
        {
            new: true
        }
    )
}

exports.resultsList = () => {
    return Exam.aggregate([
        {
            $unwind: '$results'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'results.studentId',
                foreignField: '_id',
                as: 'students'
            }
        },
        {
            $addFields: {
                result: {
                    $mergeObjects: [
                        {
                            $arrayElemAt: [
                                "$students",
                                0
                            ]
                        },
                        "$results"
                    ]
                }
            }
        },
        {
            $project: {
                students: 0,
                results: 0
            }
        },
        {
            $lookup: {
                from: "classes",
                localField: 'classId',
                foreignField: '_id',
                as: 'class',
            }
        },
        {
            $addFields: {
                class: {
                    $arrayElemAt: ["$class", 0]
                }
            }
        }
    ])
}

exports.findOneResult = (resultId) => {
    return Exam.aggregate([
        {
            $match: {
                "results._id": mongoose.Types.ObjectId(resultId)
            }
        },
        {
            $addFields: {
                result: {
                    $arrayElemAt: [
                        { $filter: { input: "$results", cond: { $eq: ["$$this._id", mongoose.Types.ObjectId(resultId)] } } },
                        0
                    ]
                }
            }
        },
        {
            $lookup: {
                from: "classes",
                localField: 'classId',
                foreignField: '_id',
                as: '_class',
            }
        },
    ])
}

exports.updateResult = (resId, studentId, result) => {
    return Exam.updateOne(
        { "results._id": resId },
        {
            $set: {
                "results.$.result": result,
                "results.$.studentId": studentId
            }
        }
    )
}

exports.findForStudent = studentId => {
    return Exam.aggregate([
        {
            $match: {
                "results.studentId": mongoose.Types.ObjectId(studentId)
            }
        },
        {
            $lookup: {
                from: "classes",
                localField: 'classId',
                foreignField: '_id',
                as: 'class',
            }
        },
        {
            $addFields: {
                class: {
                    $arrayElemAt: ["$class", 0]
                },
                results: {
                    $arrayElemAt: [
                        { $filter: { input: "$results", cond: { $eq: ["$$this.studentId", mongoose.Types.ObjectId(studentId)] } } }
                        , 0
                    ]
                }
            }
        }
    ])
}