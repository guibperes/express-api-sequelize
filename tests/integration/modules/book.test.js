const request = require('supertest');

const { App } = require('../../../src/server');
const { Book } = require('../../../src/app/book');
const { Database } = require('../../../src/database');
const { DatabaseUtils } = require('../../utils');
const { BookMock } = require('../../mocks');

describe('Book Entity', () => {
  beforeAll(() => Database.init());

  beforeEach(() => DatabaseUtils.truncate());

  describe('POST /books', () => {
    test('should create a book with description', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create());

      expect(res.status).toEqual(200);
    });

    test('should create a book without description', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ description: undefined }));

      expect(res.status).toEqual(200);
    });

    test('should return null error for name field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ name: undefined }));

      expect(res.status).toEqual(400);
    });

    test('should return length < 4 error for name field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ name: '' }));

      expect(res.status).toEqual(400);
    });

    test('should return length > 40 error for name field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ name: BookMock.getLargeName() }));

      expect(res.status).toEqual(400);
    });

    test('should return length < 4 error for description field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ description: '' }));

      expect(res.status).toEqual(400);
    });

    test('should return length > 255 error for description field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ description: BookMock.getLargeDescription() }));

      expect(res.status).toEqual(400);
    });

    test('should return null error for pages field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ pages: undefined }));

      expect(res.status).toEqual(400);
    });

    test('should return size < 1 error for pages field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ pages: 0 }));

      expect(res.status).toEqual(400);
    });

    test('should return invalid number error for pages field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ pages: '10a' }));

      expect(res.status).toEqual(400);
    });

    test('should return invalid integer error for pages field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ pages: 10.25 }));

      expect(res.status).toEqual(400);
    });
  });

  describe('GET /books', () => {
    test('should return array with two books', async () => {
      await Book.bulkCreate([BookMock.create(), BookMock.create()]);

      const res = await request(App.server).get('/books');

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(2);
    });

    test('should return empty array', async () => {
      const res = await request(App.server).get('/books');

      expect(res.status).toEqual(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /books/:id', () => {
    test('should return a book with same provided id', async () => {
      const book = await Book.create(BookMock.create());
      const res = await request(App.server).get(`/books/${book.id}`);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('id', book.id);
    });

    test('should return not found error', async () => {
      const res = await request(App.server).get('/books/1');

      expect(res.status).toEqual(404);
    });
  });

  describe('PUT /books/:id', () => {
    test('should update a book and return success status', async () => {
      const book = await Book.create(BookMock.create());
      const res = await request(App.server)
        .put(`/books/${book.id}`)
        .send(BookMock.create());

      expect(res.status).toEqual(200);
    });

    test('should return not found error', async () => {
      const res = await request(App.server).put('/books/1');

      expect(res.status).toEqual(404);
    });

    test('should return length < 4 error for name field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ name: '' }));

      expect(res.status).toEqual(400);
    });

    test('should return length > 40 error for name field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ name: BookMock.getLargeName() }));

      expect(res.status).toEqual(400);
    });

    test('should return length < 4 error for description field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ description: '' }));

      expect(res.status).toEqual(400);
    });

    test('should return length > 255 error for description field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ description: BookMock.getLargeDescription() }));

      expect(res.status).toEqual(400);
    });

    test('should return size < 1 error for pages field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ pages: 0 }));

      expect(res.status).toEqual(400);
    });

    test('should return invalid number error for pages field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ pages: '10a' }));

      expect(res.status).toEqual(400);
    });

    test('should return invalid integer error for pages field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ pages: 10.25 }));

      expect(res.status).toEqual(400);
    });
  });

  describe('DELETE /books/:id', () => {
    test('should delete book and return success status', async () => {
      const book = await Book.create(BookMock.create());
      const res = await request(App.server).delete(`/books/${book.id}`);

      expect(res.status).toEqual(200);
    });

    test('should return not found error', async () => {
      const res = await request(App.server).delete('/books/1');

      expect(res.status).toEqual(404);
    });
  });
});
