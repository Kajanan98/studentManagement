const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    content: {
        type: String
    }
})

const Comment = mongoose.model('Comment', CommentSchema)


exports.getAll = () => {
    return Comment.find()
}

exports.addComment = (author, content) => {
    const comment = new Comment({ author, content });
    return comment.save()
}

exports.updateComment = (id, content) => {
    return Comment.updateOne(
        { _id: id },
        {
            $set: { id, content }
        }
    )
}

exports.findOne = (id) => {
    return Comment.findById(id)
}

exports.deleteOne = (_id) => {
    return Comment.findOneAndDelete({ _id })
}