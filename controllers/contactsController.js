const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");

const listCont = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContById = async (req, res, next) => {
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
};

const addCont = async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeCont = async (req, res, next) => {
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
};

const updateCont = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `missing fields`);
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
};

module.exports = {
  listCont,
  getContById,
  addCont,
  removeCont,
  updateCont,
};
