const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ExamResultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
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