const winston = require("winston");
const config = require("./config");
const {format,createLogger,transports} = winston;
const{printf,combine,timestamp,colorize,uncolorize} = format;

const winstonFormat = printf((obj)=>{
    const {level,message,timestamp,stack} = obj;
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
    level:"info",
    format:combine(
        timestamp(),
        winstonFormat,
        config.env ==="development" ? colorize():uncolorize(),

    ),
    transports:[new transports.Console()]
});

module.exports = logger;