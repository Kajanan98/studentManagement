const User = require('../models/User');

const manage = (req, res) => {
    User.getParents()
        .then(data => {
            res.render('child/manage', { data, link: '/children/manage/' })
        })
}

const manageOne = (req, res) => {
    const { parent } = req.params;
    User.getUserByID(parent)
        .then(async data => {
            const added = await User.getAddedChildren()
            const students = await User.getStudents()
            res.render('child/edit', { data, students, added })
        })
}

const addStudent = (req, res) => {
    const { parent } = req.params
    const { child } = req.body;
    User.addChild(parent, child)
        .then(result => {
            res.redirect('/children/manage/' + parent);
        })
        .catch(console.log)
}

const removeStudent = (req, res) => {
    const { parent, child } = req.params;
    User.removeChild(parent, child)
        .then(result => {
            res.redirect('/children/manage/' + parent);
        })
        .catch(console.log)
}

const listAll = (req, res) => {
    const parentId = req.user._id;
    User.getChildren(parentId)
        .then(([data]) => {
            res.render('child/listChild', {
                data
            })
            // res.send(result[0]._students)
        })
        .catch(console.log())
}

module.exports = {
    manage,
    manageOne,
    listAll,
    addStudent,
    removeStudent,
}