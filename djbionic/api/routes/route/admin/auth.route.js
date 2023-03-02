const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const authAdminController = require("../../../controllers/admin/auth.admin.controller");
const authAdminValidation = require("../../../validations/admin/auth.admin.validation");
const { shouldAdmin } = require('../../../helpers/role.helper');
const { authenticate } = require('../../../helpers/auth.helper');

/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.post("/login",validator.body(authAdminValidation.login), authAdminController.login);
router.post("/forgetpass/sentotp",validator.body(authAdminValidation.sentotp),authAdminController.sentotp);
router.post("/forgetpass",validator.body(authAdminValidation.forgetpass),authAdminController.forgetpass);
router.post("/logout",authenticate,shouldAdmin,validator.body(authAdminValidation.logout),authAdminController.logout);
router.post("/token",validator.body(authAdminValidation.token),authAdminController.token);
module.exports = router;
