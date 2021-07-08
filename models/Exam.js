const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ExamResultSchema = new mongoose.Schema({
    studentId: {
        type: Schema.Types.ObjectId,
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
        required: true
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Classes'
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    results: [ExamResultSchema]
})

module.exports = mongoose.model('Exam', ExamSchema)