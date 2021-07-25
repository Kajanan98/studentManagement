const Exam = require('../models/Exam');
const User = require('../models/User');
const Class = require('../models/Class');
const Activity = require('../models/ExtracurricularActivities')
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

const viewClassReportSelect = (req, res) => {
    Class.listAll()
        .then(data => {
            res.render('selectClass', { data, parent: 'Reports', child: 'Class Results', link: '/reports/classResults/' })
        })
        .catch(console.log)
}

const viewClassReport = (req, res) => {
    const { classId } = req.params;
    Class.findWIthExams(classId)
        .then(([data]) => {
            res.render('reports/classReport', { data, moment })
        })
        .catch(console.log)
}

const listAllStudent = async (req, res) => {
    const students = await User.getStudents();
    res.render('reports', {
        students,
    })
}

const viewStudent = (req, res) => {
    const { studentId } = req.params;
    User.getUserByID(studentId)
        .then(async data => {
            const exams = await Exam.findForStudent(studentId)
            const attendances = await Class.attendanceForStudent(studentId)
            const activities = await Activity.getStudentActivity(studentId)
            data.initials = data.name.split(" ").map((n) => n[0]).join("");;
            res.render('reports/viewStudent', { data, exams, attendances, activities: activities.filter(act => act.type === 'activity'), punishments: activities.filter(act => act.type === 'punishment'), moment })
        })
        .catch(console.log);
}

module.exports = {
    resultSelectExamReport,
    findWithResultReport,
    viewAttendanceClassReport,
    viewAttendanceReport,
    viewClassReportSelect,
    viewClassReport,
    listAllStudent,
    viewStudent
}