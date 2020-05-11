const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
  redact: {
    remove: true,
    paths: [
      'hostname',
      'req.id',
      'req.headers',
      'req.remoteAddress',
      'req.remotePort',
      'res.headers',
    ],
  },
});

const loggerMiddleware = expressPino({ logger });

module.exports = { logger, loggerMiddleware };
