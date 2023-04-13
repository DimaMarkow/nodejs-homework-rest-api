const express = require("express");

const { validateBody } = require("../../utils");

const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const {
  addSchema,
  putSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

const {
  listCont,
  getContById,
  addCont,
  removeCont,
  updateCont,
  updateFavoriteCont,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", authenticate, listCont);
router.get("/:contactId", authenticate, isValidId, getContById);
router.post("/", authenticate, validateBody(addSchema), addCont);
router.delete("/:contactId", authenticate, isValidId, removeCont);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(putSchema),
  updateCont
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavoriteCont
);

module.exports = router;
