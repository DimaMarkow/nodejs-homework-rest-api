const express = require("express");

// const {
//   addContactValidation,
//   putContactValidation,
// } = require("../../middlewares/validateData");

const { validateBody } = require("../../utils");

const { addSchema, putSchema } = require("../../schemas/contacts");

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
router.post("/", validateBody(addSchema), addCont);
router.delete("/:contactId", removeCont);
router.put("/:contactId", validateBody(putSchema), updateCont);

module.exports = router;
