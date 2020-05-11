const { Router } = require('express');

const { Validations } = require('../../middlewares');
const { BookCreateValidator, BookUpdateValidator } = require('./model');
const { BookController } = require('./controller');

const routes = Router();

routes.post(
  '/',
  Validations.validateBody(BookCreateValidator),
  BookController.create
);
routes.get('/', BookController.findAll);
routes.get('/:id', Validations.validateId, BookController.findById);
routes.delete('/:id', Validations.validateId, BookController.deleteById);
routes.put(
  '/:id',
  Validations.validateId,
  Validations.validateBody(BookUpdateValidator),
  BookController.updateById
);

module.exports = { BookRoutes: routes };
