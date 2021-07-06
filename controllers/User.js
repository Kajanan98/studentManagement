const User = require('../models/User');
const bcrypt = require('bcrypt')

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
            res.redirect('/');
        })
        .catch(console.log)
}

const findOne = (req, res) => {
    const id = req.params.id;
    User.findOne(id)
        .then(result => {
            console.log(result);
            res.render('admin/newUser', {
                title: 'Edit User',
                data: result
            })
        })
        .catch(console.log)
}

const updateUser = (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const address = req.body.address;
    const mobile = req.body.mobile_number;
    const NIC = req.body.nic;
    const password = req.body.password;
    const type = req.body.type;
    User.updateUser(username, name, address, mobile, NIC, password, type)
        .then(result => {
            console.log('s');
            res.send(result)
        })
        .catch(console.log);
}

module.exports = {
    createUser,
    findOne,
    updateUser
}