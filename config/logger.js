const pino = require("pino");
const pinoPretty = require("pino-pretty");
const expressPino = require("express-pino-logger");
const fs = require("fs");
const path = require("path");

const logDir = './storage/logs';
if (!fs.existsSync(logDir)){
    fs.mkdirSync(logDir, { recursive: true });
}

const prettyStream = pinoPretty({
    colorize: true,
    colorizeObjects: true,
    singleLine:true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname,req,res",
    messageFormat: "({levelLabel} - {pid}) {msg}", 
});

const logger = pino({
    level: 'info',
}, pino.multistream([
    { stream: prettyStream, level: 'info' },
    { stream: pino.destination(path.join(logDir, 'info.log')), level: 'info' },
    { stream: pino.destination(path.join(logDir, 'warn.log')), level: 'warn' },
    { stream: pino.destination(path.join(logDir, 'error.log')), level: 'error' },
    { stream: pino.destination(path.join(logDir, 'fatal.log')), level: 'fatal' }
]));

const logger_supercharged = expressPino({ logger });

module.exports = (app) => {
    app.logger = logger;
    app.use(logger_supercharged);
    app.use((err, req, res, next) => {
        logger.error(err.message);
        res.status(500).send("Something went wrong!");
    });
};
