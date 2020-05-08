const mongoose = require('mongoose');

const { Schema } = mongoose;

const principalsSchema = new Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String },
    state: { type: String },
});

const principalModel = mongoose.model("Principal", principalsSchema);

module.exports = principalModel;