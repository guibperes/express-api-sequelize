const request = require('supertest');

const { App } = require('../../../src/server');

describe('Id validation middleware', () => {
  test('should return error for invalid number id parameter', async () => {
    const res = await request(App.server).get('/books/10a');

    expect(res.status).toEqual(400);
  });

  test('should return error for invalid integer id parameter', async () => {
    const res = await request(App.server).get('/books/10.25');

    expect(res.status).toEqual(400);
  });
});
