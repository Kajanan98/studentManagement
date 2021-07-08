const Exam = require('../models/Exam');
const moment = require('moment')

const listAll = (req, res) => {
    Exam.listAll()
        .then(result => {
            res.render('exams', { data: result, moment });
        })
        .catch(console.log)
}

const initiate = (req, res) => {
    Exam.initiate()
        .then(result => {
            res.redirect('/exams/edit/' + result._id);
        })
        .catch(console.log)
}

const ViewExam = (req, res) => {
    const { id } = req.params;
    Exam.findOne(id)
        .then(result => {
            res.render('exams/view', {
                title: 'Edit Exam',
                data: result
            })
        })
        .catch(console.log)
}

const viewEidtPage = (req, res) => {
    const { id } = req.params;
    const classes = await
    Exam.findOne(id)
        .then(result => {
            res.render('exams/edit', { data: result })
        })
        .catch(console.log)
}

const update = (req, res) => {
    const { id } = req.params;
    const { date, subject, classId, isFinished } = req.body;
    Exam.update(id, date, subject, classId, isFinished)
        .then(result => {
            res.redirect('/exams')
        })
        .catch(console.log);
}

module.exports = {
    listAll,
    initiate,
    ViewExam,
    viewEidtPage,
    update,
}