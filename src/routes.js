const { Router } = require('express');

const { Validations } = require('./middlewares');
const { BookController } = require('./controllers');
const { BookCreateValidator, BookUpdateValidator } = require('./models');

const routes = Router();

// Book
routes.post(
  '/books',
  Validations.validateBody(BookCreateValidator),
  BookController.create
);
routes.get('/books', BookController.findAll);
routes.get('/books/:id', Validations.validateId, BookController.findById);
routes.delete('/books/:id', Validations.validateId, BookController.deleteById);
routes.put(
  '/books/:id',
  Validations.validateId,
  Validations.validateBody(BookUpdateValidator),
  BookController.updateById
);

module.exports = { routes };
