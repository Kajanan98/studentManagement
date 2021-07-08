const mongoose = require('mongoose')

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
    return Exam.find()
}

exports.initiate = () => {
    const exam = new Exam();
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