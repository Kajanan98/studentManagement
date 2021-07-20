const Comment = require('../models/Comment');

const getAll = (req, res) => {
    var perPage = 6
    var page = req.params.page || 1

    Comment.getAll()
        .then(comment => {
            count = comment.length
            res.render('comments/viewComment', {
                title: 'View Comments',
                title1:'Add Comment',
                current: page,
                data: comment.slice((perPage * page) - perPage, (perPage * page)),
                pages: Math.ceil(count / perPage)

            })
        })
        .catch(console.log)
}

const addComment = (req, res) => {
    const author = req.user._id;
    const content = req.body.content;
    Comment.addComment(author, content)
        .then((result) => {
            console.log(result);
            res.redirect('/comments/1')
        })
        .catch(console.log())
}

const updateComment = (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    Comment.updateComment(id, content)
        .then(result => {
            res.redirect('/users/profile')
        })
        .catch(console.log);
}

const viewEidtPage = async (req, res) => {
    const { id } = req.params;
    Comment.findOne(id)
        .then(result => {
            res.render('Comments/newComment', {
                title1: "Edit Comment",
                data: result,
            })
        })
        .catch(console.log)
}

const deleteOne = (req, res) => {
    const { id } = req.params;
    Comment.deleteOne(id)
        .then(result => {
            res.redirect('/users/profile')
        })
        .catch(console.log);
}


module.exports = {
    getAll,
    addComment,
    updateComment,
    viewEidtPage,
    deleteOne,

}