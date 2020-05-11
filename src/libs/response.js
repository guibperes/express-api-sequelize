const { HttpStatus } = require('./httpStatus');

/*
Response Object:
  {
    error: {// Retorno de erros
      status: 404,
      data: {
        timestamp: new Date().toISOString(),
        error: 'Not Found',
        message: 'Cannot find book with provided id'
      }
    },
    content: {} // Dados do objeto com sucesso
  }
*/

function buildError(
  message = 'Internal Server Error, contact the dev',
  status = HttpStatus.INTERNAL_SERVER_ERROR
) {
  return {
    error: {
      status: status.number,
      data: {
        timestamp: Date.now(),
        name: status.name,
        message,
      },
    },
  };
}

function build(content) {
  return { content };
}

function send(res, result) {
  if (result.error) {
    return res.status(result.error.status).json(result.error.data);
  }

  return res.json(result.content);
}

module.exports = {
  Response: {
    buildError,
    build,
    send,
  },
};
