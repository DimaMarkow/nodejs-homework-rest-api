const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const phoneRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string().required().email().messages({
    "any.required": `missing required "email" field`,
    "string.empty": `"email" cannot be empty`,
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "any.required": `missing required "phone" field`,
    "string.empty": `"phone" cannot be empty`,
  }),
  favorite: Joi.boolean().messages({
    "any.required": `missing required "favorite" field`,
    "string.empty": `"favorite" cannot be empty`,
  }),
});

const putSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string().email().messages({
    "string.empty": `"email" cannot be empty`,
  }),
  phone: Joi.string().pattern(phoneRegexp).messages({
    "string.empty": `"phone" cannot be empty`,
  }),
  favorite: Joi.boolean().messages({
    "string.empty": `"favorite" cannot be empty`,
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
    "string.empty": `"favorite" cannot be empty`,
  }),
});

const ParamsSchema = Joi.object({
  contactId: Joi.string().alphanum().min(24).max(24).required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  addSchema,
  putSchema,
  updateFavoriteSchema,
  ParamsSchema,
};
