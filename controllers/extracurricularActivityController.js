const ExtracurricularActivity = require('../models/ExtracurricularActivities')
const moment = require('moment')
const User = require('../models/User')

const viewNewPage = async (req, res) => {
    const { type } = req.params;
    const students = await User.getStudents();
    res.render('activity/newActivity', {
        title1: type == 'activity' ? 'Add Extracurricular Activity' : 'Add Punishment',
        parent: type == 'activity' ? 'Extracurricular Activity' : 'Punishments',
        child: type == 'activity' ? 'Add Extracurricular Activity' : 'Add Punishment',
        acType: type,
        data: false,
        userId: req.user._id,
        students
    })
}

const add = (req, res) => {
    const author = req.user._id;
    const date = req.body.date;
    const content = req.body.content;
    const towhom = req.body.towhom;
    const type = req.body.type;
    ExtracurricularActivity.addExtracurricularActivity(author, towhom, content, date, type)
        .then((result) => {
            console.log(result);
            res.redirect('/activities/view/' + type)
        })
        .catch(console.log())
}

const update = (req, res) => {
    const { id } = req.params;
    const { towhom, content, date } = req.body;
    ExtracurricularActivity.updateExtracurricularActivity(id, towhom, content, date)
        .then(result => {
            res.redirect('/activities/view/' + result.type)
        })
        .catch(console.log);
}

const viewEidtPage = async (req, res) => {
    const { id } = req.params;
    const students = await User.getStudents();
    ExtracurricularActivity.findOne(id)
        .then(result => {
            console.log(result)
            res.render('activity/newActivity', {
                title1: result.type == 'activity' ? "Edit Extracurricular Activity" : "Edit punishment",
                parent: result.type == 'activity' ? 'Extracurricular Activity' : 'Punishments',
                data: result,
                students,
                moment
            })
        })
        .catch(console.log)
}

const deleteOne = (req, res) => {
    const { id } = req.params;
    ExtracurricularActivity.deleteOne(id)
        .then(result => {
            res.redirect('/activities/view')
        })
        .catch(console.log);
}

const get = (req, res) => {
    const { type } = req.params;
    const id = req.user._id;
    const userType = req.user.type;
    const authorName = req.user.name;
    ExtracurricularActivity.getAllActivities(type)
        .then(result => {
            res.render('activity/viewActivity', {
                data: result,
                title: type === 'activity' ? 'Extracurricular Activities' : 'Punishments',
                parent: type === 'activity' ? 'Extracurricular Activity' : 'Punishments',
                name: authorName,
                moment,
                userType
            })
        })
        .catch(console.log)
}

const getStudent = (req, res) => {
    const id = req.user._id;
    const userType = req.user.type;
    const Name = req.user.name;
    ExtracurricularActivity.getStudentActivity(id)
        .then(result => {
            res.render('activity/', {
                data: result,
                name: Name,
                moment,
                userType
            })
        })
        .catch(console.log)
}


module.exports = {
    viewNewPage,
    add,
    update,
    viewEidtPage,
    deleteOne,
    get,
    getStudent

}