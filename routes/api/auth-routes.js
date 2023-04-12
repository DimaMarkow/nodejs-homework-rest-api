const express = require("express");

const { validateBody } = require("../../utils");

const { registerSchema, loginSchema } = require("../../models/user");

const { register } = require("../../controllers/auth-controllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

module.exports = router;
