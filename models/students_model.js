const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//  OR Destructuring it like below.
//  const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    age: { type: Number },
    state: { type: String },
    classes: { type: String },
});

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;