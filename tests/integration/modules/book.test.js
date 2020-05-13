const request = require('supertest');

const { App } = require('../../../src/server');
const db = require('../../../src/database');
const { DatabaseMock, BookMock } = require('../../mocks');

describe('POST /books', () => {
  test('should create a book with description', async () => {
    const book = BookMock.create();
    db.query = DatabaseMock.query({ id: 1, ...book });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(200);
  });

  test('should create a book without description', async () => {
    const book = BookMock.create({ description: undefined });
    db.query = DatabaseMock.query({ id: 1, ...book });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('description', '');
  });

  test('should return null error for name field', async () => {
    const book = BookMock.create({ name: undefined });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return length < 4 error for name field', async () => {
    const book = BookMock.create({ name: '' });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return length > 40 error for name field', async () => {
    const book = BookMock.create({ name: BookMock.getLargeName() });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return length < 4 error for description field', async () => {
    const book = BookMock.create({ description: '' });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return length > 255 error for description field', async () => {
    const book = BookMock.create({
      description: BookMock.getLargeDescription(),
    });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return null error for pages field', async () => {
    const book = BookMock.create({ pages: undefined });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return size < 1 error for pages field', async () => {
    const book = BookMock.create({ pages: 0 });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return invalid number error for pages field', async () => {
    const book = BookMock.create({ pages: '10a' });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return invalid integer error for pages field', async () => {
    const book = BookMock.create({ pages: 10.25 });

    const res = await request(App.server).post('/books').send(book);

    expect(res.status).toEqual(400);
  });
});

describe('GET /books', () => {
  test('should return array with two books', async () => {
    const books = [
      { id: 1, ...BookMock.create() },
      { id: 2, ...BookMock.create() },
    ];
    db.query = DatabaseMock.query(books);

    const res = await request(App.server).get('/books');

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(books);
  });

  test('should return empty array', async () => {
    db.query = DatabaseMock.query([]);

    const res = await request(App.server).get('/books');

    expect(res.status).toEqual(200);
    expect(res.body).toEqual([]);
  });
});

describe('GET /books/:id', () => {
  test('should return a book with same provided id', async () => {
    db.query = DatabaseMock.query({ id: 1, ...BookMock.create() });

    const res = await request(App.server).get('/books/1');

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  test('should return not found error', async () => {
    db.query = DatabaseMock.query([]);

    const res = await request(App.server).get('/books/1');

    expect(res.status).toEqual(404);
  });
});

describe('PUT /books/:id', () => {
  test('should update a book and return success status', async () => {
    const book = BookMock.create();
    db.query = DatabaseMock.query({ id: 1, ...book });

    const res = await request(App.server).put('/books/1').send(book);

    expect(res.status).toEqual(200);
  });

  test('should return not found error', async () => {
    db.query = DatabaseMock.query([]);

    const res = await request(App.server).put('/books/1');

    expect(res.status).toEqual(404);
  });

  test('should return length < 4 error for name field', async () => {
    const book = BookMock.create({ name: '' });

    const res = await request(App.server).put('/books/1').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return length > 40 error for name field', async () => {
    const book = BookMock.create({ name: BookMock.getLargeName() });

    const res = await request(App.server).put('/books/1').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return length < 4 error for description field', async () => {
    const book = BookMock.create({ description: '' });

    const res = await request(App.server).put('/books/1').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return length > 255 error for description field', async () => {
    const book = BookMock.create({
      description: BookMock.getLargeDescription(),
    });

    const res = await request(App.server).put('/books/1').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return size < 1 error for pages field', async () => {
    const book = BookMock.create({ pages: 0 });

    const res = await request(App.server).put('/books/1').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return invalid number error for pages field', async () => {
    const book = BookMock.create({ pages: '10a' });

    const res = await request(App.server).put('/books/1').send(book);

    expect(res.status).toEqual(400);
  });

  test('should return invalid integer error for pages field', async () => {
    const book = BookMock.create({ pages: 10.25 });

    const res = await request(App.server).put('/books/1').send(book);

    expect(res.status).toEqual(400);
  });
});

describe('DELETE /books/:id', () => {
  test('should delete book and return success status', async () => {
    db.query = DatabaseMock.query({ id: 1, ...BookMock.create() });

    const res = await request(App.server).delete('/books/1');

    expect(res.status).toEqual(200);
  });

  test('should return not found error', async () => {
    db.query = DatabaseMock.query([]);

    const res = await request(App.server).delete('/books/1');

    expect(res.status).toEqual(404);
  });
});
