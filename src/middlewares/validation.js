const Yup = require('yup');

const idValidator = Yup.object().shape({
  id: Yup.number().integer().required(),
});

async function validateId(req, res, next) {
  const isValidId = await idValidator.isValid(req.params);

  if (!isValidId) {
    return res.status(400).json({
      timestamp: new Date().toISOString(),
      error: 'Bad Request',
      message: 'Id parameter must be integer',
    });
  }

  return next();
}

// Clojure
const validateBody = validator => async (req, res, next) => {
  try {
    await validator.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  Validations: {
    validateId,
    validateBody,
  },
};
