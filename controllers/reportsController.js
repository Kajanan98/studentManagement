const Exam = require('../models/Exam');
const Class = require('../models/Class');
const moment = require('moment')

const viewAttendanceClassReport = (req, res) => {
    Class.listAll()
        .then(data => {
            res.render('selectClass', { data, parent: 'Reports', child: 'Attendances', link: '/reports/attendances/' })
        })
        .catch(console.log)
}

const viewAttendanceReport = async (req, res) => {
    const { classId } = req.params;
    const [data] = await Class.viewAttendance(classId);
    const [detail] = await Class.getSummary(classId)
    res.render('attendance/view', { data, detail, moment, parent: 'Reports', child: 'Attendances', })
}

const resultSelectExamReport = (req, res) => {
    Exam.listAll()
        .then(data => {
            res.render('exams/selectExam', { data, moment, parent: 'Reports', child: 'Exam Results', link: '/reports/results/' });
        })
        .catch(console.log)
}

const findWithResultReport = (req, res) => {
    const { examId } = req.params;
    Exam.findWithResult(examId)
        .then(([data]) => {
            res.render('exams/results', { data, moment, parent: 'Reports', child: 'Exam Results' })
        })
        .catch(console.log)
}

module.exports = {
    resultSelectExamReport,
    findWithResultReport,
    viewAttendanceClassReport,
    viewAttendanceReport,
}