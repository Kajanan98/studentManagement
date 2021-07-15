const Comment = require('../models/Comment')

const newcomment = (req, res) => {
    res.render('comments/newComment', {
        title: 'Add Notice',
        data: false
    })
}

const viewComment = (req, res) => {
    var perPage = 6
    var page = req.params.page || 1
    Notice = [{ date: '2021-97-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-017-08', content: 'jwefwhefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }, { date: '2021-07-08', content: 'jwef wjehgfwhefgh whfgwhf whefvgwefh whefvgywef wfgvwyefv', author: 'sjg' }],
        count = Notice.length;
    res.render('comments/viewComment', {
        title: 'View Notice',
        current: page,
        data: Notice.slice((perPage * page) - perPage, (perPage * page)),
        pages: Math.ceil(count / perPage)
    })


}

module.exports = {
    newcomment,
    viewComment
}