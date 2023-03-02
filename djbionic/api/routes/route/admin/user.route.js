const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const userAdminController = require("../../../controllers/admin/user.admin.controller");
const { shouldAdmin } = require('../../../helpers/role.helper');
const { authenticate } = require('../../../helpers/auth.helper');
/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.get("/",authenticate,shouldAdmin, userAdminController.list);
router.put("/changestatus/:id",authenticate,shouldAdmin, userAdminController.changestatus);
module.exports = router;
