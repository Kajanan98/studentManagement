const Notice = require('../models/Notice');

const getAll = (req, res) => {
    var perPage = 6
    var page = req.params.page || 1
    
    Notice.getAll()
        .then(notice => {
            count = notice.length
            res.render('notices/viewNotice', { 
                title:'View Notice',
                current: page,
                data:notice.slice((perPage*page)-perPage,(perPage*page)),
                pages: Math.ceil(count / perPage)

            })
        })
        .catch(console.log)
}

const addNotice = (req,res) => {
    const author = req.body.author;
    const content = req.body.content;
    Notice.addNotice(author,content)
    .then((result)=>{
        console.log(result);
        res.redirect('/notices/1')
    })
    .catch(console.log())
}

const updateNotice = (req,res) => {
    const { id } = req.params;
    const { content } = req.body;
    Notice.updateNotice(id, content)
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
    getAll,
    addNotice,
    updateNotice,
    viewEidtPage,
    deleteOne,
    
}