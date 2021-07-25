var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    records: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        attendance: {
            type: Boolean,
            default: true
        }
    }]
})

var ClassSchema = new Schema({
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
        ref: 'User'
    },
    students: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    timeTable: [{
        period: {
            type: Number,
            default: 0,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        subject: {
            type: String,
            default: ''
        }
    }],
    attendances: [AttendanceSchema]
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

exports.initiate = (classTeacher) => {
    const classObj = new Class({ classTeacher })
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

exports.findLast = () => {
    return Class.find().sort('_id').limit(1).then(array => array[0])
}

exports.deleteOne = (_id) => {
    return Class.findOneAndDelete({ _id })
}

exports.getStudentsDetails = classId => {
    return Class.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(classId) }
        },
        {
            $lookup: {
                from: "users",
                as: '_students',
                localField: 'students.userId',
                foreignField: '_id'
            }
        },
    ])
}

exports.viewAttendance = classId => {
    return Class.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(classId) }
        },
        {
            $addFields: {
                studentsInfo: {
                    $reduce: {
                        input: "$attendances",
                        initialValue: [],
                        in: { $setUnion: ["$$value", "$$this.records.studentId"] }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "users",
                as: 'studentsInfo',
                localField: 'attendances.records.studentId',
                foreignField: '_id'
            }
        },
        {
            $addFields: {
                _attendances: {
                    $map: {
                        input: "$_attendances",
                        in: {
                            _id: "$$this._id",
                            name: "$$this.name"
                        }
                    }
                }
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                attendanceDates: {
                    $map: {
                        input: "$attendances",
                        as: "attendance",
                        in: "$$attendance.date"
                    }
                },
                _students: {
                    $map: {
                        input: "$studentsInfo",
                        as: "student",
                        in: {
                            $mergeObjects: [
                                "$$student",
                                {
                                    attendances: {
                                        $map: {
                                            input: "$attendances",
                                            as: "a",
                                            in: {
                                                $mergeObjects: [
                                                    {
                                                        _id: "$$a._id",
                                                        date: "$$a.date",
                                                    },
                                                    {
                                                        $arrayElemAt: [
                                                            {
                                                                $filter: {
                                                                    input: "$$a.records",
                                                                    as: "record",
                                                                    cond: { $eq: ["$$record.studentId", "$$student._id"] }
                                                                }
                                                            }
                                                            , 0
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    ])
}

exports.getSummary = classId => {
    return Class.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(classId) }
        },
        {
            $addFields: {
                attendanceDetails: {
                    $map: {
                        input: "$attendances",
                        in: {
                            _id: "$$this._id",
                            date: "$$this.date",
                            total: {
                                $reduce: {
                                    input: "$$this.records",
                                    initialValue: 0,
                                    in: { $sum: ["$$value", 1] }
                                }
                            },
                            attendeces: {
                                $reduce: {
                                    input: {
                                        $filter: {
                                            input: "$$this.records",
                                            as: "record",
                                            cond: { $eq: ["$$record.attendance", true] }
                                        }
                                    },
                                    initialValue: 0,
                                    in: { $sum: ["$$value", 1] }
                                }
                            },
                        }
                    }
                }
            }
        },
        {
            $project: {
                students: 0,
                teachers: 0,
                timetable: 0,
                attendances: 0
            }
        }
    ])
}

exports.attendanceForStudent = studentId => {
    return Class.aggregate([
        {
            $match: { "attendances.records.studentId": mongoose.Types.ObjectId(studentId) }
        },
        {
            $project: {
                title: 1,
                description: 1,
                attendances: {
                    $map: {
                        input: "$attendances",
                        as: "a",
                        in: {
                            $mergeObjects: [
                                {
                                    _id: "$$a._id",
                                    date: "$$a.date"
                                },
                                {
                                    $arrayElemAt: [
                                        { $filter: { input: "$$a.records", cond: { $eq: ["$$this.studentId", mongoose.Types.ObjectId(studentId)] } } }
                                        , 0
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $unwind: "$attendances"
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: ["$$ROOT", "$attendances"] } }
        },
        {
            $project: {
                attendances: 0
            }
        }
    ])
}

exports.getSingleAttendance = (id) => {
    return Class.aggregate([
        {
            $match: {
                "attendances._id": mongoose.Types.ObjectId(id)
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                attendances: {
                    $arrayElemAt: [
                        { $filter: { input: "$attendances", cond: { $eq: ["$$this._id", mongoose.Types.ObjectId(id)] } } }
                        , 0
                    ]
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'attendances.records.studentId',
                foreignField: '_id',
                as: '_students'
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                attendances: {
                    $mergeObjects: [
                        "$attendances",
                        {
                            records: {
                                $map: {
                                    input: "$attendances.records",
                                    as: "at",
                                    in: {
                                        $mergeObjects: [
                                            {
                                                $arrayElemAt: [
                                                    { $filter: { input: "$_students", cond: { $eq: ["$$this._id", "$$at.studentId"] } } }
                                                    , 0
                                                ]
                                            },
                                            "$$at"
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    ])
}

exports.updateAttendanceDate = (attId, date) => {
    return Class.updateOne(
        {
            "attendances._id": mongoose.Types.ObjectId(attId)
        },
        {
            $set: {
                "attendances.$.date": date
            }
        }
    )
}

exports.updateAttendanceRecord = (recId, attendance) => {
    return Class.updateOne(
        {
            "attendances.records._id": mongoose.Types.ObjectId(recId)
        },
        {
            $set: {
                "attendances.$[].records.$[element].attendance": attendance
            },
        },
        {
            arrayFilters: [{ 'element._id': recId }]
        }
    )
}

exports.markAttendance = (classId, date, students) => {
    return Class.updateOne({ _id: classId }, {
        $push: {
            attendances: {
                date,
                records: students
            }
        }
    })
}

exports.initiateTimetable = (classId, teacher) => {
    return Class.findOneAndUpdate(
        { _id: classId },
        {
            $push: {
                timeTable: { teacher }
            }
        },
        {
            new: true
        }
    ).then(doc => {
        return doc.timeTable[doc.timeTable.length - 1]
    })
}

exports.getOneTimetable = (id) => {
    return Class.aggregate([
        {
            $match: {
                "timeTable._id": mongoose.Types.ObjectId(id)
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                timeTable: {
                    $arrayElemAt: [
                        { $filter: { input: "$timeTable", cond: { $eq: ["$$this._id", mongoose.Types.ObjectId(id)] } } }
                        , 0
                    ]
                }
            }
        }
    ])
}

exports.updateTimetable = (id, { period, teacher, subject }) => {
    return Class.updateOne(
        { 'timeTable._id': id },
        {
            $set: {
                "timeTable.$.teacher": teacher,
                "timeTable.$.period": period,
                "timeTable.$.subject": subject,
            }
        }
    )
}

exports.deleteTimetable = id => {
    return Class.updateOne(
        { 'timeTable._id': id },
        {
            $pull: {
                timeTable: {
                    _id: id
                }
            }
        }
    )
}

exports.listAllTimetables = () => {
    return Class.aggregate([
        {
            $unwind: '$timeTable'
        },
        {
            $addFields: {
                classId: "$_id"
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'timeTable.teacher',
                foreignField: '_id',
                as: 'teacherInfo'
            }
        },
        {
            $project: {
                _id: "$timeTable._id",
                title: 1,
                description: 1,
                classId: 1,
                timeTable: 1,
                teacherInfo: {
                    $arrayElemAt: [
                        "$teacherInfo"
                        , 0
                    ]
                }
            }
        },
    ])
}

exports.listAllWithSubTeachers = () => {
    return Class.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'timeTable.teacher',
                foreignField: '_id',
                as: 'teacherInfo'
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                timeTable: {
                    $map: {
                        input: '$timeTable',
                        as: 'tt',
                        in: {
                            $mergeObjects: [
                                "$$tt",
                                {
                                    teacherInfo: {
                                        $arrayElemAt: [
                                            { $filter: { input: "$teacherInfo", cond: { $eq: ["$$this._id", "$$tt.teacher"] } } }
                                            , 0
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
    ])
}

exports.timeTableForTeacher = () => {
    return Class.aggregate([
        {
            $unwind: '$timeTable'
        },
        {
            $sort: {
                "timeTable.period": 1
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'timeTable.teacher',
                foreignField: '_id',
                as: 'teacherInfo'
            }
        },
        {
            $project: {
                title: 1,
                timeTable: 1,
                teacherInfo: {
                    $arrayElemAt: [
                        '$teacherInfo', 0
                    ]
                }
            }
        },
        {
            $group: {
                _id: '$timeTable.teacher',
                teacherInfo: {
                    $first: "$teacherInfo"
                },
                timeTable: {
                    $push: {
                        $mergeObjects: [
                            '$timeTable', { title: "$title" },
                        ]
                    }
                }
            }
        }
    ])
}

exports.findWIthExams = (classId) => {
    return Class.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(classId)
            }
        },
        {
            $lookup: {
                from: 'exams',
                localField: '_id',
                foreignField: 'classId',
                as: 'exams'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'exams.results.studentId',
                foreignField: '_id',
                as: 'students'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'classTeacher',
                foreignField: '_id',
                as: '_classTeacher'
            }
        },
        {
            $addFields: {
                exams: {
                    $map: {
                        input: '$exams',
                        as: 'exam',
                        in: {
                            $mergeObjects: [
                                "$$exam",
                                {
                                    results: {
                                        $map: {
                                            input: "$$exam.results",
                                            as: "res",
                                            in: {
                                                $mergeObjects: [
                                                    {
                                                        $arrayElemAt: [
                                                            { $filter: { input: "$students", cond: { $eq: ["$$this._id", "$$res.studentId"] } } }
                                                            , 0
                                                        ]
                                                    },
                                                    "$$res"
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $addFields: {
                classTeacher: {
                    $arrayElemAt: [
                        "$_classTeacher"
                        , 0
                    ]
                }
            }
        }
    ])
}

exports.getAddedStudents = () => {
    return Class.distinct('students.userId')
}

exports.getClassStudents = classId => {
    return Class.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(classId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'students.userId',
                foreignField: '_id',
                as: 'students'
            }
        }
    ])
}