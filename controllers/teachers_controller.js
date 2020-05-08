const mongoose = require('mongoose');

const TeacherModel = require('../models/teachers_model');

//  GET All Teacher
module.exports.getAllTeachers = (req, res, next) => {
    TeacherModel.find()
        .then((teachers) => {
            const formattedStaff = teachers.map((eachTeacher) => {
                return {
                    _id: eachTeacher._id,
                    name: eachTeacher.name,
                    username: eachTeacher.username,
                    password: eachTeacher.password,
                    role: eachTeacher.role,
                    classes: eachTeacher.classes,
                    semesters: eachTeacher.semesters,
                    studentsCount: eachTeacher.studentsCount,
                };
            });
            return res.status(200).json({
                Message: "All Teachers Listed Here...",
                Teachers: formattedStaff,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  GET Individual Teacher
module.exports.getIndividualTeacher = (req, res, next) => {
    const studentID = req.params.individualID;
    TeacherModel.findById(studentID)
        .then((teacher) => {
            if (teacher) {
                return res.status(200).json({
                    Message: "Individual Teacher Listed Here...",
                    Student: {
                        _id: teacher._id,
                        name: teacher.name,
                        username: teacher.username,
                        password: teacher.password,
                        role: teacher.role,
                        classes: teacher.classes,
                        semesters: teacher.semesters,
                        studentsCount: teacher.studentsCount,
                    },
                });
            }
            else {
                return res.status(404).json({
                    Message: "No record found for this user...",
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  ADD Individual Teacher
module.exports.addIndividualTeacher = (req, res, next) => {
    const bodyParam = req.body;

    //  Get instance of the StudentModel
    const teacher = new TeacherModel({
        name: bodyParam.name,
        username: bodyParam.username,
        password: bodyParam.password,
        role: bodyParam.role,
        classes: bodyParam.classes,
        semesters: bodyParam.semesters,
        studentsCount: bodyParam.studentsCount,
    });

    //  Check if the User already exist in Teacher record in the DB
    TeacherModel.findOne({ username : teacher.username })
        .then((existingTeacher) => {
            if (existingTeacher) {
                //  This means the user exists so return a response message.
                return res.status(200).json({
                    Message: "User already exist. Please login with your users details."
                });
            }

            //Save the student
            teacher.save()
                .then((result) => {
                    res.status(201).json({
                        Message: "Individual Teacher Added Here...",
                        Teacher: {
                            _id: result._id,
                            name: result.name,
                            username: result.username,
                            password: result.password,
                            role: result.role,
                            classes: result.classes,
                            semesters: result.semesters,
                            studentsCount: result.studentsCount,
                        },
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        Error: error,
                    });
                });
        });
};

//  UPDATE Individual Teacher
module.exports.updateIndividualTeacher = (req, res, next) => {
    const teacherID = req.params.individualID;
    TeacherModel.findByIdAndUpdate(teacherID, req.body)
        .then((teacher) => {
            return res.status(201).json({
                Message: `Individual Teacher with TeacherID = ${teacherID} Updated successfully...`,
                Teacher: {
                    _id: teacher._id,
                    name: teacher.name,
                    username: teacher.username,
                    password: teacher.password,
                    role: teacher.role,
                    classes: teacher.classes,
                    semesters: teacher.semesters,
                    studentsCount: teacher.studentsCount,
                },
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  DELETE Individual Teacher
module.exports.deleteIndividualTeacher = async (req, res, next) => {
    const teacherID = req.params.individualID;
    try {
        const teacher = await TeacherModel.findByIdAndDelete(teacherID);
        if (teacher) {
            res.status(200).json({
                Message: `Individual Student with username = ${teacher.username} was Deleted successfully...`,
            });
        } else {
            res.status(404).json({
                Message: "Record can not be found...",
            })
        }
    } catch (error) {
        res.status(500).json({
            Error: {
                Message: error.message,
                Value: error.value,
            },
        })
    }
};