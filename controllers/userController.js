const User = require('../models/User');
const Exam = require('../models/Exam')
const Class = require('../models/Class')
const bcrypt = require('bcrypt');
const moment = require('moment')

const registerPrincipal = (req, res) => {
    const { name, address, mobile_number: mobile, nic: NIC, username, password, cPassword } = req.body;
    if (password === cPassword) {
        User.createUser(name, address, mobile, NIC, username, password, 'principal')
            .then(data => {
                res.redirect('/login')
            })
            .catch(console.log)
    } else {
        res.redirect('/login')
    }
}

// const listAll = async (req, res) => {
//     const principal = await User.getPrincipal();
//     const teachers = await User.getTeachers()
//     const students = await User.getStudents();
//     const parents = await User.getParents()
//     res.render('users', { principal, teachers, students, parents })
// }
const listAllPrincipal = async (req,res) => {
    const principal = await User.getPrincipal();
    res.render('users',{
        principal,
        teachers:false,
        students:false,
        parents:false,
        title:'View Principal'
    })
}

const listAllTeacher = async (req,res) => {
    const teachers = await User.getTeachers();
    res.render('users',{
        principal:false,
        teachers,
        students:false,
        parents:false,
        title:'View Teachers'
    })
}

const listAllStudent = async (req,res) => {
    const students = await User.getStudents();
    res.render('users',{
        principal:false,
        teachers:false,
        students,
        parents:false,
        title:'View Students'
    })
}

const listAllParent = async (req,res) => {
    const parents = await User.getParents();
    res.render('users',{
        principal:false,
        teachers:false,
        students:false,
        parents,
        title:'View Parents'
    })
}

const manage = (req, res) => {
    User.listAll()
        .then(data => {
            res.render('users/manage', { data })
        })
        .catch(console.log)
}

const addTeacher = (req, res) => {
    res.render('users/newUser', { userType: 'teacher', data: false, title: 'Add Teacher' })
}

const addStudent = (req, res) => {
    res.render('users/newUser', { userType: 'student', data: false, title: 'Add Student' })
}

const addParent = (req, res) => {
    res.render('users/newUser', { userType: 'parent', data: false, title: 'Add Parent' })
}

const createUser = async (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const mobile = req.body.mobile_number;
    const NIC = req.body.nic;
    const username = req.body.user_name;
    const password = req.body.password;
    const type = req.body.type;
    const hashedPassword = await bcrypt.hash(password, 10);
    User.createUser(name, address, mobile, NIC, username, hashedPassword, type)
        .then(result => {
            res.redirect('/users');
        })
        .catch(console.log)
}

const findOne = (req, res) => {
    const id = req.params.id;
    User.getUserByID(id)
        .then(result => {
            console.log(result);
            res.render('users/newUser', {
                title: 'Edit User',
                data: result
            })
        })
        .catch(console.log)
}

// const getUsers = (req, res) => {
//     User.getUsers()
//         .then((result) => {
//             res.render('admin/newClass', {
//                 title: 'Add New Class',
//                 data: false,
//                 users: result,
//                 teachers: [],
//                 days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//                 periods: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],

//             })
//         })
//         .catch(console.log);
// }

const updateUser = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const mobile = req.body.mobile_number;
    const NIC = req.body.nic;
    const password = req.body.password;
    const type = req.body.type;
    User.updateUser(id, name, address, mobile, NIC, password, type)
        .then(result => {
            
            res.redirect('/users/manage')
        })
        .catch(console.log);
}

const getProfile = (req, res) => {
    // var user_name = '123'
    var id = req.user._id;
    var user_name = req.user.username

    User.getUserByID(id)
        .then(async result => {
            const notices = await User.findNotices(id);
            const comments = await User.findComments(id);
            res.render('profile/index', {
                // data: result

                data: result,
                notices: notices[0]._notice,
                comments: comments[0]._comment,
                moment,

            })
        })
        .catch(console.log)
}

const deleteOne = (req, res) => {
    const { id } = req.params;
    User.deleteOne(id)
        .then(result => {
            res.redirect('/users/manage')
        })
        .catch(console.log);
}

const editProfilePage = (req, res) => {
    const id = req.user._id;
    
    User.getUserByID(id)
        .then(result => {
            res.render('profile/edit', {
                data: result,
                title: 'Edit profile'
            })
        })
        .catch(console.log);
}

const updateProfile = (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const mobile = req.body.mobile_number;
    const NIC = req.body.nic;

    const id = req.user._id;
    //const username = '123';

    User.updateUser(id, name, address, mobile, NIC)
        .then(result => {
            res.redirect('/users/profile/')
        })
        .catch(console.log);
}

const viewStudent = (req, res) => {
    const { studentId } = req.params;
    User.getUserByID(studentId)
        .then(async data => {
            const exams = await Exam.findForStudent(studentId)
            const attendances = await Class.attendanceForStudent(studentId)
            console.log(attendances)
            data.initials = data.name.split(" ").map((n) => n[0]).join("");;
            res.render('users/viewStudent', { data, exams, attendances, moment })
        })
        .catch(console.log);
}

module.exports = {
    registerPrincipal,
    // listAll,
    manage,
    addTeacher,
    addStudent,
    addParent,
    createUser,
    findOne,
    updateUser,
    // getUsers,
    getProfile,
    deleteOne,
    editProfilePage,
    updateProfile,
    viewStudent,
    listAllPrincipal,
    listAllTeacher,
    listAllStudent,
    listAllParent
}