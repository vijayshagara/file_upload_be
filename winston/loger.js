const {createLogger, format, transports} = require('winston')

const loggerWinston = createLogger({
    transports:[
        new transports.Console(),
    ],
    format: format.combine(
        format.colorize(),
        format.json(),
        format.timestamp(),
        //format.prettyPrint(),
    ),
});




module.exports =  loggerWinston;

