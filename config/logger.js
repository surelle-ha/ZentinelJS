const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty', 
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        },
        level: 'info',
      },
      {
        target: 'pino/file',
        options: {
          destination: './storage/logs/info.log', 
        },
        level: 'info',
      },
      {
        target: 'pino/file',
        options: {
          destination: './storage/logs/warn.log', 
        },
        level: 'warn',
      },
      {
        target: 'pino/file',
        options: {
          destination: './storage/logs/error.log', 
        },
        level: 'error',
      },
      {
        target: 'pino/file',
        options: {
          destination: './storage/logs/fatal.log', 
        },
        level: 'fatal',
      }
    ]
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      user: req.raw ? req.raw.user : 'unauthenticated',
    }),
  }
});

const loggerPino = expressPino({ logger });

module.exports = { loggerPino };