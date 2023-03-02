const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const notificationAdminController = require("../../../controllers/admin/notification.admin.controller");
const { shouldAdmin } = require('../../../helpers/role.helper');
const { authenticate } = require('../../../helpers/auth.helper');
const notificationAdminValidation = require('../../../validations/admin/notification.admin.validation')

/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.get("/",authenticate,shouldAdmin, notificationAdminController.list);
router.post("/add",authenticate,shouldAdmin,validator.body(notificationAdminValidation.add), notificationAdminController.add)
router.delete("/delete/:id",authenticate,shouldAdmin,notificationAdminController.delete);
module.exports = router;
