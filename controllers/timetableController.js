const Class = require('../models/Class');
const User = require('../models/User')

const timetableSelectClass = (req, res) => {
    Class.listAll()
        .then(data => {
            res.render('selectClass', { data, parent: 'Timetables', child: 'View', link: "/timetables/" });
        })
        .catch(console.log)
}

const viewTimeTable = (req, res) => {
    Class.listAllWithSubTeachers()
        .then(async data => {
            const teacherTimeTable = await Class.timeTableForTeacher()
            res.render('timetables', { data, teacherTimeTable });
        })
        .catch(console.log)
}

const newTimetableSelectClass = (req, res) => {
    Class.listAll()
        .then(data => {
            res.render('selectClass', { data, parent: 'Timetables', child: 'Add Timetable', link: "/timetables/new/" });
        })
        .catch(console.log)
}

const initiateTimetable = async (req, res) => {
    const { classId } = req.params;
    const [teacher] = await User.getTeachers()
    Class.initiateTimetable(classId, teacher)
        .then(({ _id }) => {
            res.redirect(`/timetables/${_id}/edit`);
        })
        .catch(console.log)
}

const viewEditPage = (req, res) => {
    const { id } = req.params;
    Class.getOneTimetable(id)
        .then(async ([data]) => {
            const teachers = await User.getTeachers();
            res.render('timetables/edit', { data, teachers });
        })
        .catch(console.log)
}

const updateTimetable = (req, res) => {
    const { id } = req.params;
    Class.updateTimetable(id, req.body)
        .then(() => {
            res.redirect(`/timetables/list`);
        })
        .catch(console.log)
}

const deleteTimetable = (req, res) => {
    const { id } = req.params;
    Class.deleteTimetable(id)
        .then(() => {
            res.redirect(`/timetables/list`);
        })
        .catch(console.log)
}

const listAllTimetables = (req, res) => {
    Class.listAllTimetables()
        .then(data => {
            res.render(`timetables/list`, { data });
        })
        .catch(console.log)
}

module.exports = {
    viewTimeTable,
    newTimetableSelectClass,
    initiateTimetable,
    viewEditPage,
    updateTimetable,
    deleteTimetable,
    listAllTimetables
}