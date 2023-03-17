const express = require("express");
const { userDetails, userPatch } = require("../controllers/PasswordController");

const PasswordReseter = express.Router();

PasswordReseter.get("/", userDetails);
PasswordReseter.patch("/", userPatch);

module.exports = { PasswordReseter };
