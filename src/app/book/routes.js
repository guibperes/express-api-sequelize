const { BaseRoutes } = require('../../base');
const { BookCreateValidator, BookUpdateValidator } = require('./model');
const { BookController } = require('./controller');

const routes = BaseRoutes.init(
  BookController,
  BookCreateValidator,
  BookUpdateValidator
);

module.exports = { BookRoutes: routes };
