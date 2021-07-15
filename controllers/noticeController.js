const Notice = require('../models/Notice');

const newNotice = (req, res) => {
    res.render('notices/newNotice', {
        title: 'Add Notice',
        data: false
    })
}

const viewNotice = (req, res) => {
    var perPage = 6
    var page = req.params.page || 1
    Notice = [{ date: '2021-97-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-017-08', content: 'jwefwhefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }],
        count = Notice.length;
    res.render('notices/viewNotice', {
        title: 'View Notice',
        current: page,
        data: Notice.slice((perPage * page) - perPage, (perPage * page)),
        pages: Math.ceil(count / perPage)
    })
}

module.exports = {
    newNotice,
    viewNotice
}