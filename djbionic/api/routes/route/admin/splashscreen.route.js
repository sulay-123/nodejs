const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const splashscreenAdminController = require("../../../controllers/admin/splashscreen.admin.controller");
const { shouldAdmin } = require('../../../helpers/role.helper');
const { authenticate } = require('../../../helpers/auth.helper');
const splashscreenAdminValidation = require('../../../validations/admin/splashscreen.admin.validation')

/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.get("/",authenticate,shouldAdmin, splashscreenAdminController.list);
router.post("/add",authenticate,shouldAdmin,validator.body(splashscreenAdminValidation.add), splashscreenAdminController.add)
// router.get("/details",authenticate,shouldAdmin,albumAdminController.details);
// router.put("/edit/:id",authenticate,shouldAdmin,validator.body(albumAdminValidation.add), albumAdminController.edit)
router.delete("/delete/:id",authenticate,shouldAdmin,splashscreenAdminController.delete);
module.exports = router;
