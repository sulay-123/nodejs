const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact.controller");
const contactValidation = require("../../validations/contact.validation");
const {validator} = require("../../helpers/validator.helper");
router.post("/add",validator.body(contactValidation.contact),contactController.contact);


module.exports = router;
