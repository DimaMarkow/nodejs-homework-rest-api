const { HttpError } = require("../helpers");

const validateParams = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      next(HttpError(404, `Not found`));
    }
    next();
  };

  return func;
};

module.exports = validateParams;
