const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const NoticeSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    content: String
})

module.exports = mongoose.model('Notice', NoticeSchema)