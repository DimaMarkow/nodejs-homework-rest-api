const contacts = require("../models/contacts");

const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const listCont = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} was not found`);
  }
  res.json(result);
};

const addCont = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeCont = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} was not found`);
  }
  res.json({ message: "contact deleted" });
};

const updateCont = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, `missing fields`);
  }
  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} was not found`);
  }
  res.json(result);
};

module.exports = {
  listCont: ctrlWrapper(listCont),
  getContById: ctrlWrapper(getContById),
  addCont: ctrlWrapper(addCont),
  removeCont: ctrlWrapper(removeCont),
  updateCont: ctrlWrapper(updateCont),
};
