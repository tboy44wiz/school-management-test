const mongoose = require('mongoose');

const { Schema } = mongoose;

const staffSchema = new Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
    state: { type: String },
});

const staffModel = mongoose.model("Staff", staffSchema);

module.exports = staffModel;