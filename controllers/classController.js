const User = require('../models/Class');


const createClass = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const instructor = req.body.instructor;
    const students = Array.prototype.slice.call(req.body.students);
    const teachers = [];//req.body.teachers;
    const timeTable = [req.body.day,req.body.period,req.body.subject];
    
console.log(students);
    User.createClass(title, description, instructor, students, teachers, timeTable)
        .then(result => {
            res.redirect('/');
        })
        .catch(console.log)
}



module.exports = {
    createClass,
    
}