const { Response, logger } = require('../libs');

const errorMiddleware = async (err, req, res, next) => {
  logger.error(err);
  return Response.send(res, Response.buildError());
};

module.exports = { errorMiddleware };
