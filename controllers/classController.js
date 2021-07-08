const Class = require('../models/Class');
const User = require('../models/User');

const listAll = (req, res) => {
    Class.listAll()
        .then(result => {
            res.render('classes', { data: result });
        })
        .catch(console.log)
}

const newClass = async (req, res) => {
    const teachers = await User.getTeachers();
    if (teachers.length) {
        Class.initiate(teachers[0]._id)
            .then(result => {
                res.redirect('/classes/edit/' + result._id);
            })
            .catch(console.log)
    } else {
        res.render('error', { message: 'To create a class, you must have a teacher record', parent: 'Classes', child: 'Add Class' })
    }
}

const viewEidtPage = (req, res) => {
    const { id } = req.params;
    Class.findOne(id)
        .then(async result => {
            const students = await User.getStudents();
            const teachers = await User.getTeachers();
            res.render('classes/edit', { data: result, students, teachers })
        })
        .catch(console.log)
}

const updateDetails = (req, res) => {
    const { id } = req.params;
    const { title, description, classTeacher } = req.body;

    Class.updateDetails(id, title, description, classTeacher)
        .then(result => {
            res.redirect('/classes');
        })
        .catch(console.log)
}

const addStudent = (req, res) => {
    const { classId } = req.params
    const { studentId } = req.body;
    Class.addStudent(classId, studentId)
        .then(result => {
            res.redirect('/classes/edit/' + classId);
        })
        .catch(console.log)
}

const removeStudent = (req, res) => {
    const { classId } = req.params
    const { studentId } = req.body;
    Class.removeStudent(classId, studentId)
        .then(result => {
            res.redirect('/classes/edit/' + classId);
        })
        .catch(console.log)
}

const timetableSelectClass = (req, res) => {
    Class.listAll()
        .then(result => {
            res.render('classes/timetableSelectClass', { data: result });
        })
        .catch(console.log)
}

const viewTimeTable = (req, res) => {
    const { classId } = req.params;
    Class.findOne(classId)
        .then(result => {
            res.render('classes/timetable', { data: result });
        })
        .catch(console.log)
}


const deleteOne = (req, res) => {
    const { id } = req.params;
    Class.deleteOne(id)
        .then(result => {
            res.redirect('/classes')
        })
        .catch(console.log);
}

module.exports = {
    listAll,
    newClass,
    updateDetails,
    viewEidtPage,
    addStudent,
    removeStudent,
    timetableSelectClass,
    viewTimeTable,
    deleteOne
}