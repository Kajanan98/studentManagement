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
    content: {
        type: String,
    }
})

const Notice = mongoose.model('Notice', NoticeSchema)

exports.getAll = () => {
    return Notice.find()
}

exports.addNotice = (author, content) => {
    const notice = new Notice({ author, content });
    return notice.save()
}

exports.updateNotice = (id, content) => {
    return Notice.updateOne(
        { _id: id },
        {
            $set: { id, content }
        }
    )
}

exports.findOne = (id) => {
    return Notice.findById(id)
}

exports.deleteOne = (_id) => {
    return Notice.findOneAndDelete({ _id })
}

