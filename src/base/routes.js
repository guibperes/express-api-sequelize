const { Router } = require('express');

const { Validations } = require('../middlewares');

const init = (Controller, CreateValidator, UpdateValidator) => {
  const routes = Router();

  routes.post(
    '/',
    Validations.validateBody(CreateValidator),
    Controller.create
  );
  routes.get('/', Controller.findAll);
  routes.get('/:id', Validations.validateId, Controller.findById);
  routes.delete('/:id', Validations.validateId, Controller.deleteById);
  routes.put(
    '/:id',
    Validations.validateId,
    Validations.validateBody(UpdateValidator),
    Controller.updateById
  );

  return routes;
};

module.exports = {
  BaseRoutes: {
    init,
  },
};
