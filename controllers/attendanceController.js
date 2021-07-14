const User = require('../models/User');
const Class = require('../models/Class')
const moment = require('moment')

const viewAttendanceClass = (req, res) => {
    Class.listAll()
        .then(data => {
            res.render('selectClass', { data, parent: 'Attendance', child: 'View', link: '/attendance/view/' })
        })
        .catch(console.log)
}

const viewAttendance = async (req, res) => {
    const { classId } = req.params;
    const [data] = await Class.viewAttendance(classId);
    const [detail] = await Class.getSummary(classId)
    res.render('attendance/view', { data, detail, moment })
}

const viewHistoryClass = (req, res) => {
    Class.listAll()
        .then(data => {
            res.render('selectClass', { data, parent: 'Attendance', child: 'History', link: '/attendance/history/' })
        })
        .catch(console.log)
}

const viewHistory = (req, res) => {
    const { classId } = req.params;
    Class.getSummary(classId)
        .then(([data]) => {
            res.render('attendance/history', { data, moment })
        })
        .catch(console.log)
}

const takeAttendanceClass = (req, res) => {
    Class.listAll()
        .then(data => {
            res.render('selectClass', { data, parent: 'Attendance', child: 'Take attendance', link: '/attendance/add/' })
        })
        .catch(console.log)
}

const takeAttendance = (req, res) => {
    const { classId } = req.params;
    Class.getStudentsDetails(classId)
        .then(([data]) => {
            res.render('attendance/add', { data, child: 'Take attendance', moment })
        })
        .catch(console.log)
}

const markAttendance = (req, res) => {
    const { classId } = req.params;
    const { date = Date.now(), students } = req.body;
    const modifiedStudents = Object.values(students).map(value => JSON.parse(value))
    Class.markAttendance(classId, date, modifiedStudents)
        .then(() => {
            res.redirect('/attendance/view/' + classId)
        })
        .catch(console.log)
}

const viewEditPage = (req, res) => {
    const { attId } = req.params;
    Class.getSingleAttendance(attId)
        .then(([data]) => {
            res.render('attendance/edit', { data, parent: 'Attendance', child: 'Modify', link: '/attendance/modify/', moment })
        })
        .catch(console.log)
}

const updateAttendanceDate = (req, res) => {
    const { attId } = req.params;
    const { date } = req.body;
    Class.updateAttendanceDate(attId, date)
        .then(() => {
            res.redirect('/attendance/edit/' + attId)
        })
        .catch(console.log)
}

const updateAttendanceRecord = (req, res) => {
    const { recId, attendance, attId } = req.params;
    Class.updateAttendanceRecord(recId, attendance)
        .then(() => {
            res.redirect('/attendance/edit/' + attId)
        })
        .catch(console.log)
}

module.exports = {
    viewAttendanceClass,
    viewAttendance,
    viewHistoryClass,
    viewHistory,
    takeAttendanceClass,
    takeAttendance,
    markAttendance,
    viewEditPage,
    updateAttendanceDate,
    updateAttendanceRecord
}