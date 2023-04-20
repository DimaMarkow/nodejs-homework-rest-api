const express = require("express");

const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const { validateBody } = require("../../utils");

const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../models/user");

const {
  register,
  login,
  getCurrent,
  logout,
  subscriptionUpdate,
  updateAvatar,
} = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/subscription",
  authenticate,
  validateBody(subscriptionSchema),
  subscriptionUpdate
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
