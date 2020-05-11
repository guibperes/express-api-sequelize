const { Response } = require('../../src/libs/response');
const { HttpStatus } = require('../../src/libs/httpStatus');

describe('Response build function', () => {
  test('should be content array', () => {
    const content = [
      { name: 'Guilherme', age: 21 },
      { name: 'Tiago', age: 26 },
    ];

    expect(Response.build(content)).toEqual({ content });
  });

  test('should be content object', () => {
    const content = { name: 'Guilherme', age: 21 };

    expect(Response.build(content)).toEqual({ content });
  });
});

describe('Response buildError function', () => {
  test('should be Internal Server Error', () => {
    const response = Response.buildError();

    expect(response.error.status).toEqual(
      HttpStatus.INTERNAL_SERVER_ERROR.number
    );
    expect(response.error.data.name).toEqual(
      HttpStatus.INTERNAL_SERVER_ERROR.name
    );
    expect(response.error.data.message).toEqual(
      'Internal Server Error, contact the dev'
    );
  });

  test('should be Not Found Error', () => {
    const response = Response.buildError(
      'Cannot found entity with provided id',
      HttpStatus.NOT_FOUND
    );

    expect(response.error.status).toEqual(HttpStatus.NOT_FOUND.number);
    expect(response.error.data.name).toEqual(HttpStatus.NOT_FOUND.name);
    expect(response.error.data.message).toEqual(
      'Cannot found entity with provided id'
    );
  });
});
