const StudentModel = require('../models/students_model');

//  GET All Student
module.exports.getAllStudents = (req, res, next) => {
    StudentModel.find()
        .then((students) => {
            const formattedStaff = students.map((eachStudent) => {
                return {
                    _id: eachStudent._id,
                    name: eachStudent.name,
                    username: eachStudent.username,
                    password: eachStudent.password,
                    age: eachStudent.age,
                    state: eachStudent.state,
                    classes: eachStudent.classes,
                }
            });
            return res.status(200).json({
                Message: "All Student Listed Here...",
                Students: formattedStaff,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  Get Student Classes
module.exports.getStudentClasses = async (req, res, next) => {
    const queryParams = req.query;

    console.log("ReqParams::: " + JSON.stringify(queryParams));

    const student = await StudentModel.find(queryParams);
    try {
        if (student.length !== 0) {
            return res.status(200).json({
                Message: "Successfully Logged in...",
                Student: student,
            })
        }
        else {
            return res.status(200).json({
                Message: "No record found for this user...",
                Student: student,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: error,
        });
    }
};

//  GET Individual Principal
module.exports.getIndividualStudent = (req, res, next) => {
    const reqParams = req.params.individualID;
    StudentModel.findOne({_id: reqParams })
        .then((student) => {
            if (student) {
                return res.status(200).json({
                    Message: "Individual Student Listed Here...",
                    Student: {
                        _id: student._id,
                        name: student.name,
                        username: student.username,
                        password: student.password,
                        age: student.age,
                        state: student.state,
                        classes: student.classes,
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

//  ADD Individual Student
module.exports.addIndividualStudent = (req, res, next) => {
    const bodyParam = req.body;

    //  Get instance of the StudentModel
    const student = new StudentModel({
        name: bodyParam.name,
        username: bodyParam.username,
        password: bodyParam.password,
        age: bodyParam.age,
        state: bodyParam.state,
        classes: bodyParam.classes,
    });

    //  Check if the User already exist in Staff record in the DB
    StudentModel.findOne({ username : student.username })
        .then((existingStudent) => {
            if (existingStudent) {
                //  This means the user exists so return a response message.
                return res.status(200).json({
                    Message: "User already exist. Please login with your users details."
                });
            }
            else {
                //Save the student
                student.save()
                    .then((result) => {
                        return res.status(201).json({
                            Message: "Successfully added...",
                            Student: {
                                _id: result._id,
                                name: result.name,
                                username: result.username,
                                password: result.password,
                                age: result.age,
                                state: result.state,
                                classes: result.classes,
                            },
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            Error: error,
                        });
                    });
            }
        });
};

//  UPDATE Individual Student
module.exports.updateIndividualStudent = (req, res, next) => {
    const studentID = req.params.individualID;

    StudentModel.findByIdAndUpdate(studentID, req.body)
        .then((student) => {
            return res.status(201).json({
                Message: `Individual Student with StudentID = ${studentID} Updated successfully...`,
                Student: {
                    _id: student._id,
                    name: student.name,
                    username: student.username,
                    password: student.password,
                    age: student.age,
                    state: student.state,
                    classes: student.classes,
                },
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};

//  DELETE Individual Student
module.exports.deleteIndividualStudent = (req, res, next) => {
    const studentID = req.params.individualID;
    StudentModel.findByIdAndDelete(studentID)
        .then((student) => {
            return res.status(200).json({
                Message: `Individual Student with StudentID = ${studentID} Deleted successfully...`,
                Student:  {
                    _id: student._id,
                    name: student.name,
                    username: student.username,
                    password: student.password,
                    age: student.age,
                    state: student.state,
                    classes: student.classes,
                },
            });
        })
        .catch((error) => {
            return res.status(500).json({
                Error: error,
            });
        });
};