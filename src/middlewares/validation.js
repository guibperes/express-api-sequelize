const Yup = require('yup');

const { Response, HttpStatus } = require('../libs');

const idValidator = Yup.object().shape({
  id: Yup.number().integer().required(),
});

const validateId = async (req, res, next) => {
  const isValidId = await idValidator.isValid(req.params);

  if (!isValidId) {
    return Response.send(
      res,
      Response.buildError(
        'Id parameter must be integer',
        HttpStatus.BAD_REQUEST
      )
    );
  }

  return next();
};

// Clojure
const validateBody = validator => async (req, res, next) => {
  try {
    await validator.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return Response.send(
      res,
      Response.buildError(error.errors.join(', '), HttpStatus.BAD_REQUEST)
    );
  }
};

module.exports = {
  Validations: {
    validateId,
    validateBody,
  },
};
