const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const NoticeSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    }
})

const Notice = mongoose.model('Notice', NoticeSchema)

exports.getAll = () => {
    return Notice.find().sort({ date: -1 })
}

exports.addNotice = (title, content) => {
    const notice = new Notice({ title, content });
    return notice.save()
}

exports.updateNotice = (id, title, content) => {
    return Notice.updateOne(
        { _id: id },
        {
            $set: { title, content }
        }
    )
}

exports.findOne = (id) => {
    return Notice.findById(id)
}

exports.deleteOne = (_id) => {
    return Notice.findOneAndDelete({ _id })
}

