const express = require("express");

const { validateBody } = require("../../utils");

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

router.get("/", listCont);
router.get("/:contactId", getContById);
router.post("/", validateBody(addSchema), addCont);
router.delete("/:contactId", removeCont);
router.put("/:contactId", validateBody(putSchema), updateCont);
router.patch(
  "/:contactId/favorite",
  validateBody(updateFavoriteSchema),
  updateFavoriteCont
);

module.exports = router;
