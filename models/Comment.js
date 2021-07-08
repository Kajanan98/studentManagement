const mongoose = require('mongoose');

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

module.exports = mongoose.model('Comment', CommentSchema)