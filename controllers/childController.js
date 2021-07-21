const Children = require('../models/Children');
const User = require('../models/User');

const newChild = async (req, res) => {
    const parents = await User.getParents();
    if (parents.length) {
        Children.initiate(parents[0]._id)
            .then(result => {
                res.redirect('/children/edit/' + result._id);
            })
            .catch(console.log)
    } else {
        res.render('error', { message: 'you must have a parent record', parent: 'Children', child: 'Add Children' })
    }
}

const viewEidtPage = (req, res) => {
    const { id } = req.params;
    Children.findOne(id)
        .then(async result => {
            const students = await User.getStudents();
            const parents = await User.getParents();console.log(result)
            res.render('child/', { data: result, students, parents })
        })
        .catch(console.log)
}

const updateDetails = (req, res) => {
    const { id } = req.params;
    const { parent } = req.body;

    Children.updateDetails(id, parent)
        .then(result => {
            res.redirect('/children');
        })
        .catch(console.log)
}

const addStudent = (req, res) => {
    const { classId } = req.params
    const { studentId } = req.body;
    Children.addStudent(classId, studentId)
        .then(result => {
            res.redirect('/children/edit/' + classId);
        })
        .catch(console.log)
}

const removeStudent = (req, res) => {
    const { classId } = req.params
    const { studentId } = req.body;
    Children.removeStudent(classId, studentId)
        .then(result => {
            res.redirect('/children/edit/' + classId);
        })
        .catch(console.log)
}

const listAll = (req,res) => {
    const parentId = req.user._id;
    // const parentId = '60f8038bbe90201450cdad76'
    Children.getStudentsDetails(parentId)
    .then(result => {
        res.render('child/listChild',{
            students:result[0]._students,
        })
        // res.send(result[0]._students)
    })
    .catch(console.log())
}

module.exports = {
    listAll,
    newChild,
    updateDetails,
    viewEidtPage,
    addStudent,
    removeStudent,
   
}