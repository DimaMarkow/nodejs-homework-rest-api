const express = require("express");

const authenticate = require("../../middlewares/authenticate");

const { validateBody } = require("../../utils");

const { registerSchema, loginSchema } = require("../../models/user");

const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;
