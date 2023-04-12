const express = require("express");

const { validateBody } = require("../../utils");

const { registerSchema, loginSchema } = require("../../models/user");

const { register, login } = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

module.exports = router;
