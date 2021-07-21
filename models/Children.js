var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ChildrenSchema = new Schema ({
    parent : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    children: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})
const Children = mongoose.model('Children', ChildrenSchema);


exports.initiate = (parent) => {
    const childObj = new Children({ parent })
    return childObj.save()
}

exports.findOne = (id) => {
    return Children.findById(id)
}

exports.updateDetails = (_id, parent) => {
    return Children.updateOne({ _id }, {
        $set: { parent }
    })
}

exports.addStudent = (_id, student) => {
    return Children.updateOne({ _id }, {
        $push: {
            children: {
                studentId: student
            }
        }
    })
}

exports.removeStudent = (_id, student) => {
    return Children.updateOne({ _id }, {
        $pull: {
            children: {
                studentId: student
            }
        }
    })
}

exports.findLast = () => {
    return Children.find().sort('_id').limit(1).then(array => array[0])
}

exports.deleteOne = (_id) => {
    return Children.findOneAndDelete({ _id })
}


exports.getStudentsDetails = parentId => {
    return Children.aggregate([
        {
            $match: { parent: mongoose.Types.ObjectId(parentId) }
        },
        {
            $lookup: {
                from: "users",
                as: '_students',
                localField: 'children.studentId',
                foreignField: '_id'
            }
        },
    ])
}