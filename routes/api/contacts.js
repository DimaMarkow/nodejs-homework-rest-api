const express = require("express");

const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validateData");

const {
  listCont,
  getContById,
  addCont,
  removeCont,
  updateCont,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", listCont);
router.get("/:contactId", getContById);
router.post("/", addContactValidation, addCont);
router.delete("/:contactId", removeCont);
router.put("/:contactId", putContactValidation, updateCont);

module.exports = router;
