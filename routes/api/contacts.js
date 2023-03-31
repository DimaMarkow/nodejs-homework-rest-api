const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

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

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} was not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} was not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `missing fields`);
    }
    const { error } = putSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;

    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} was not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
