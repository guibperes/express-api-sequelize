const { Response, HttpStatus } = require('../libs');

// Factory
const init = (EntityName, Entity) => {
  const create = async entityData =>
    Response.build(await Entity.create(entityData));

  const findById = async id => {
    const entity = await Entity.findByPk(id);

    if (!entity) {
      return Response.buildError(
        `Cannot find ${EntityName} with provided id`,
        HttpStatus.NOT_FOUND
      );
    }

    return Response.build(entity);
  };

  const updateById = async (id, entityData) => {
    const entity = await Entity.findByPk(id);

    if (!entity) {
      return Response.buildError(
        `Cannot find ${EntityName} with provided id`,
        HttpStatus.NOT_FOUND
      );
    }

    const updatedEntity = await entity.update(entityData);
    return Response.build(updatedEntity);
  };

  const deleteById = async id => {
    const entity = await Entity.findByPk(id);

    if (!entity) {
      return Response.buildError(
        `Cannot find ${EntityName} with provided id`,
        HttpStatus.NOT_FOUND
      );
    }

    await entity.destroy();
    return Response.build({ deleted: true });
  };

  const findAll = async () => Response.build(await Entity.findAll());

  return { create, findById, updateById, deleteById, findAll };
};

module.exports = {
  BaseService: {
    init,
  },
};
