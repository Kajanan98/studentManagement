var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Class schema

var ClassSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    students: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    }],
    teachers: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        subject: String
    }],
    timeTable: [{
        day: String,
        peroid: Number,
        subject: String
    }]
});

var Class = mongoose.model('Class', ClassSchema);

exports.listAll = () => {
    return Class.aggregate([
        {
            $lookup: {
                from: "users",
                as: '_classTeacher',
                localField: 'classTeacher',
                foreignField: '_id'
            }
        },
    ])
}

exports.initiate = () => {
    const classObj = new Class()
    return classObj.save()
}

exports.findOne = (id) => {
    return Class.findById(id)
}

exports.updateDetails = (_id, title, description, classTeacher) => {
    return Class.updateOne({ _id }, {
        $set: { title, description, classTeacher }
    })
}

exports.addStudent = (_id, studentid) => {
    return Class.updateOne({ _id }, {
        $push: {
            students: {
                userId: studentid
            }
        }
    })
}

exports.removeStudent = (_id, studentid) => {
    return Class.updateOne({ _id }, {
        $pull: {
            students: {
                userId: studentid
            }
        }
    })
}

exports.addTeacher = (_id, title, description, classTeacher) => {
    return Class.updateOne({ _id }, {
        $set: { title, description, classTeacher }
    })
}






// Fetch all classes
// module.exports.getClasses = function (callback, limit) {
//     Class.find(callback).limit(limit);
// };

// // Fetch a single class
// module.exports.getClassById = function (id, callback) {
//     Class.findById(id, callback);
// };

// Create a lesson
// module.exports.addLesson = function (info, callback) {
//     class_id = info['class_id'];
//     lesson_number = info['lesson_number'];
//     lesson_title = info['lesson_title'];
//     lesson_body = info['lesson_body'];

//     Class.findByIdAndUpdate(
//         class_id,
//         { $push: { "lessons": { lesson_number: lesson_number, lesson_title: lesson_title, lesson_body: lesson_body } } },
//         { safe: true, upsert: true },
//         callback
//     );
// };

// Update Lesson
// module.exports.updateLesson = function (info, callback) {
//     class_id = info['class_id'];
//     lesson_number = info['lesson_number'];
//     lesson_title = info['lesson_title'];
//     lesson_body = info['lesson_body'];

//     Class.findById(class_id, function (err, classname) {
//         if (err) {
//             throw err;
//         }

//         var lessons = classname.lessons;
//         var lesson;

//         for (var i = 0; i < lessons.length; i++) {
//             if (lessons[i].lesson_number == lesson_number) {
//                 lesson = lessons[i];
//                 lesson.lesson_number = lesson_number;
//                 lesson.lesson_title = lesson_title;
//                 lesson.lesson_body = lesson_body;
//             }
//         }

//         Class.findByIdAndUpdate(
//             class_id,
//             { $set: { "lessons": lessons } },
//             { safe: true },
//             callback
//         );
//     });
// };
// // Delete Lesson
// module.exports.deleteLesson = function (info, callback) {
//     class_id = info['class_id'];
//     lesson_number = info['lesson_number'];

//     Class.findByIdAndUpdate(
//         class_id,
//         { $pull: { "lessons": { lesson_number: lesson_number } } },
//         { safe: true },
//         callback
//     );
// };
