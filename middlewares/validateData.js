const Joi = require("joi");

const { HttpError } = require("../helpers");

module.exports = {
  addContactValidation: (req, res, next) => {
    const addSchema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": `missing required "name" field`,
        "string.empty": `"name" cannot be empty`,
      }),
      email: Joi.string().required().email().messages({
        "any.required": `missing required "email" field`,
        "string.empty": `"email" cannot be empty`,
      }),
      phone: Joi.string().required().messages({
        "any.required": `missing required "phone" field`,
        "string.empty": `"phone" cannot be empty`,
      }),
    });
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  },
  putContactValidation: (req, res, next) => {
    const putSchema = Joi.object({
      name: Joi.string().messages({
        "string.empty": `"name" cannot be empty`,
      }),
      email: Joi.string().email().messages({
        "string.empty": `"email" cannot be empty`,
      }),
      phone: Joi.string().messages({
        "string.empty": `"phone" cannot be empty`,
      }),
    });
    const { error } = putSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next();
  },
};
