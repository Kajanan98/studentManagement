const mongoose = require('mongoose')
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

const Notice = mongoose.model('Notice', NoticeSchema)

exports.getAll = () => {
    return Notice.find()
}

exports.addNotice = (author, content) => {
    const notice = new Notice({ author, content });
    return notice.save()
}