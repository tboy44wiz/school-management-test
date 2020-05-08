const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const winston = require('winston');

//  Connect to MongoDB using Mongoose.
mongoose.connect("mongodb://localhost/mySchoolManagementSystemDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

//  Import Custom Winston Logger Object.
const logger = require('./settings/logger')

//  Importing Routes
const studentsRouter = require('./routes/students_route');
const teachersRouter = require('./routes/teachers_route');
const principalRouter = require('./routes/principal_route');
const staffRouter = require('./routes/staff_route');

const app = express();

//  parse JSON-encoded bodies and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Using Middleware Morgan for logging.
if (app.get("env") === "production") {
    app.use(morgan("common", { stream: winston.stream.write }));
} else {
    app.use(morgan("dev", { stream: winston.stream.write }));
}


// To avoid CORS errors, we need to allow some Header accesses as done below
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    /*res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);*/

    next();
});

//  Requesting for imported Routes
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);
app.use('/principals', principalRouter);
app.use('/staff', staffRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}. Kindly visit http://localhost:${PORT}`);
});