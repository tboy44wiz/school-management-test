const winston = require('winston');
const appRoot = require('app-root-path');


// Define the custom settings for each transport (file, console).
const options = {
    console: {
        level: "debug",
        json: false,
        colorize: true,
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
        ),
    },
    file: {
        filename: `${appRoot}/logs/MySchoolManagementErrorLog.log`,
        level: "warn",
        json: true,
        colorize: true,
        maxsize: 5242800,
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
    },
};


//  Creating a Winston Logger with the "option" settings defined above.
const {console, file} = options;
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(console),
        new winston.transports.File(file),
    ],
    exitOnError: false,     // Do not exit on handled exceptions
});


// Create a stream Object with a 'write' Function that will be used by `morgan`
logger.stream = {
    write: (message, encoding) => {
        // Use the 'info' log level so the output will be picked up by both transports (file and console).
        logger.info(message);
    }
};

//  Export the logger.
module.exports = logger