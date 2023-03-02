const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users.controller");
const userValidation = require("../../validations/user.validation");
const {validator} = require("../../helpers/validator.helper");
router.post("/registerdevice",validator.body(userValidation.registerdevice),usersController.registerdevice);
router.post('/userstatusbydeviceid',usersController.getUserByDeviceId);


module.exports = router;
