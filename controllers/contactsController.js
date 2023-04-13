const { Contact } = require("../models/contact");

const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const listCont = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

const getContById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} was not found`);
  }
  res.json(result);
};

const addCont = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeCont = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
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

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} was not found`);
  }
  res.json(result);
};

const updateFavoriteCont = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, `missing field favorite`);
  }
  const { contactId } = req.params;
  console.log(req.params);

  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = {
  listCont: ctrlWrapper(listCont),
  getContById: ctrlWrapper(getContById),
  addCont: ctrlWrapper(addCont),
  removeCont: ctrlWrapper(removeCont),
  updateCont: ctrlWrapper(updateCont),
  updateFavoriteCont: ctrlWrapper(updateFavoriteCont),
};
