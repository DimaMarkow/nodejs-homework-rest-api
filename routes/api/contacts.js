const express = require("express");

const { validateBody } = require("../../utils");
const { validateParams } = require("../../utils");

const isValidId = require("../../middlewares/isValidId");

const {
  addSchema,
  putSchema,
  updateFavoriteSchema,
  ParamsSchema,
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

router.get("/", listCont);
router.get("/:contactId", isValidId, getContById);
router.post("/", validateBody(addSchema), addCont);
router.delete("/:contactId", isValidId, removeCont);
router.put(
  "/:contactId",
  validateParams(ParamsSchema),
  validateBody(putSchema),
  updateCont
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavoriteCont
);

module.exports = router;
