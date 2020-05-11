const request = require('supertest');

const { App } = require('../../src/server');
const db = require('../../src/database');

/*
- Testes Sucesso
  * name, description, pages corretos
  * name, pages corretos
- Testes Falha
  * pages correto, name: null
  * pages correto, name: ''
  * pages correto, name > 40
  * name correto, pages: null
  * name correto, pages: 0
  * name correto, pages: '10a'
  * name correto, pages: 10.5
  * name correto, pages correto, description: ''
  * name correto, pages correto, description > 255
*/
describe('POST /books', () => {
  test('name, description, pages correct', async () => {
    db.query = jest.fn().mockReturnValue({
      rows: [
        {
          id: 1,
          name: 'My book',
          description: 'my book description',
          pages: 100,
        },
      ],
    });

    const res = await request(App.server).post('/books').send({
      name: 'My book',
      description: 'my book description',
      pages: 100,
    });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('pages');
  });
});

describe('GET /books', () => {});

describe('GET /books/:id', () => {});

describe('PUT /books/:id', () => {});

describe('DELETE /books/:id', () => {});
