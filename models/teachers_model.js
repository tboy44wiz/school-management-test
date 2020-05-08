const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = new Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
    classes: { type: Array },
    semesters: { type: Object },
    studentsCount: { type: Number },
})

const teacherModel = mongoose.model("Teacher", teacherSchema );

module.exports = teacherModel;