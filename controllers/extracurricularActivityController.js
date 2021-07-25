const ExtracurricularActivity = require('../models/ExtracurricularActivities')
const moment = require('moment')
const User = require('../models/User')

const add = (req, res) => {
    const author = req.user._id;
    const date = req.body.date;
    const content = req.body.content;
    const towhom = req.body.towhom;
    ExtracurricularActivity.addExtracurricularActivity(author, towhom, content, date)
        .then((result) => {
            console.log(result);
            res.redirect('/activities/view')
        })
        .catch(console.log())
}

const update = (req, res) => {
    const { id } = req.params;
    const { towhom, content, date } = req.body;
    ExtracurricularActivity.updateExtracurricularActivity(id, towhom, content, date)
        .then(result => {
            res.redirect('/activities/view')
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
                title1: "Edit Extracurricular Activity",
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
    const id = req.user._id;
    const userType = req.user.type;
    const authorName = req.user.name;
    ExtracurricularActivity.getAllActivities()
        .then(result => {
            res.render('activity/viewActivity', {
                data: result,
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
    add,
    update,
    viewEidtPage,
    deleteOne,
    get,
    getStudent

}