const User = require('../models/User');
const Class = require('../models/Class')

const takeAttendanceClass = (req, res) => {
    Class.listAll()
        .then(data => {
            res.render('attendance/selectClass', { data })
        })
        .catch(console.log)
}

module.exports = {
    takeAttendanceClass,
}