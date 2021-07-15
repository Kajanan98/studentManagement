const Notice = require('../models/Notice');
const moment = require('moment')

const listAll = (req, res) => {
    Notice.getAll()
        .then(data => {
            res.render('notices', { data, moment })
        })
        .catch(console.log)
}

const getAll = (req, res) => {
    var perPage = 6
    var page = req.params.page || 1
    Notice.getAll()
        .then(notice => {
            count = notice.length
            res.render('notices/viewNotice', {
                title: 'View Notice',
                current: page,
                data: notice.slice((perPage * page) - perPage, (perPage * page)),
                pages: Math.ceil(count / perPage),
                moment
            })
        })
        .catch(console.log)
}

const viewNewPage = (req, res) => {
    res.render('notices/newNotice', {
        title: 'Add Notice',
        data: false,
        userId: req.user._id
    })
}

const addNotice = (req, res) => {
    const { title, content } = req.body;
    Notice.addNotice(title, content)
        .then((result) => {
            res.redirect('/notices/1')
        })
        .catch(console.log())
}

const updateNotice = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    Notice.updateNotice(id, title, content)
        .then(result => {
            res.redirect('/notices/1')
        })
        .catch(console.log);
}

const viewEidtPage = async (req, res) => {
    const { id } = req.params;
    Notice.findOne(id)
        .then(result => {
            res.render('notices/newNotice', {
                title: "Edit Notice",
                data: result,
            })
        })
        .catch(console.log)
}

const deleteOne = (req, res) => {
    const { id } = req.params;
    Notice.deleteOne(id)
        .then(result => {
            res.redirect('/notices/1')
        })
        .catch(console.log);
}


module.exports = {
    listAll,
    getAll,
    viewNewPage,
    addNotice,
    updateNotice,
    viewEidtPage,
    deleteOne,
}