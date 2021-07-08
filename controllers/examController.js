const Exam = require('../models/Exam');
const Class = require('../models/Class')
const moment = require('moment')

const listAll = (req, res) => {
    Exam.listAll()
        .then(result => {
            res.render('exams', { data: result, moment });
        })
        .catch(console.log)
}

const initiate = async (req, res) => {
    const { _id: lastClass } = await Class.findLast()
    //const lastClass = false
    if (lastClass) {
        Exam.initiate(lastClass)
            .then(result => {
                res.redirect('/exams/edit/' + result._id);
            })
            .catch(console.log)
    } else {
        res.render('error', { message: 'Please add any class', parent: 'Exams', child: 'Add Exam' })
    }
}

const ViewExam = (req, res) => {
    const { id } = req.params;
    Exam.findOne(id)
        .then(result => {
            res.render('exams/view', {
                title: 'Edit Exam',
                data: result,
                classes
            })
        })
        .catch(console.log)
}

const viewEidtPage = async (req, res) => {
    const { id } = req.params;
    const classes = await Class.listAll();
    Exam.findOne(id)
        .then(result => {
            res.render('exams/edit', { data: result, classes })
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

const deleteOne = (req, res) => {
    const { id } = req.params;
    Exam.deleteOne(id)
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
    deleteOne
}