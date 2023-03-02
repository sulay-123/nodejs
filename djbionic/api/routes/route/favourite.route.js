const express = require("express");
const router = express.Router();
const favouriteController = require("../../controllers/favourite.controller");
const favouriteValidation = require("../../validations/favourite.validation");
const {validator} = require("../../helpers/validator.helper");
const { authenticate } = require('../../helpers/auth.helper');

router.post("/add",authenticate,validator.body(favouriteValidation.addfavourite),favouriteController.addfavourite);
router.get("/list",authenticate,favouriteController.getfavourite);
router.get("/remove",authenticate,favouriteController.removefavourite)

module.exports = router;
