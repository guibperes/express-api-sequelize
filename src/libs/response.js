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
        timestamp: new Date().toISOString(),
        name: status.name,
        message,
      },
    },
  };
}

function build(content) {
  return { content };
}

module.exports = {
  Response: {
    buildError,
    build,
  },
};
