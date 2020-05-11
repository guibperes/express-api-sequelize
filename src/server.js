const express = require('express');
require('express-async-errors');

const { loggerMiddleware, logger } = require('./libs');
const { notFound } = require('./middlewares');
const { routes } = require('./routes');

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use(routes);
server.use('*', notFound);

async function start() {
  try {
    server.listen(5000, () => logger.info('Server is running on port 5000'));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
start();
