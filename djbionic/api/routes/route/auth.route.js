const express = require("express");
const router = express.Router();
const {validator} = require("../../helpers/validator.helper");
const authController = require("../../controllers/auth.controller");
const authValidation = require("../../validations/auth.validation");

/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.post("/login", validator.body(authValidation.login), authController.login);
router.post("/register", validator.body(authValidation.register), authController.register);
router.post("/forgetpass/sentotp",validator.body(authValidation.sentotp),authController.resentforgetpassmail);
router.post("/forgetpass",validator.body(authValidation.forgetpass),authController.forgetpass);
module.exports = router;
