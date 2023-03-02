const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const eventAdminController = require("../../../controllers/admin/event.admin.controller");
const { shouldAdmin } = require('../../../helpers/role.helper');
const { authenticate } = require('../../../helpers/auth.helper');
const eventAdminValidation = require('../../../validations/admin/event.admin.validation')
/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.get("/",authenticate,shouldAdmin, eventAdminController.list);
router.post("/add",authenticate,shouldAdmin,validator.body(eventAdminValidation.add_event), eventAdminController.add)
router.get("/details",authenticate,shouldAdmin,eventAdminController.details);
router.put("/edit/:id",authenticate,shouldAdmin,validator.body(eventAdminValidation.edit_event), eventAdminController.edit)
router.delete("/delete/:id",authenticate,shouldAdmin,eventAdminController.delete);
module.exports = router;