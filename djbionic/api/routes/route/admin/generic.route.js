const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const genricAdminController = require("../../../controllers/admin/genric.admin.controller");
const { shouldAdmin } = require('../../../helpers/role.helper');
const { authenticate } = require('../../../helpers/auth.helper');
const genricAdminValidation = require('../../../validations/admin/genric.admin.validation')

/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.get("/",authenticate,shouldAdmin, genricAdminController.list);
router.post("/add",authenticate,shouldAdmin,validator.body(genricAdminValidation.add), genricAdminController.add)
router.get("/details",authenticate,shouldAdmin,genricAdminController.details);
router.put("/edit/:id",authenticate,shouldAdmin,validator.body(genricAdminValidation.add), genricAdminController.edit)
router.delete("/delete/:id",authenticate,shouldAdmin,genricAdminController.delete);
router.get("/list",authenticate,shouldAdmin, genricAdminController.listgenric)
module.exports = router;
