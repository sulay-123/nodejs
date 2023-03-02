const express = require("express");
const router = express.Router();
const radioController = require("../../controllers/radio.controller");
const { authenticate } = require('../../helpers/auth.helper');

router.get("/",authenticate,radioController.list);


module.exports = router;
