const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const albumAdminController = require("../../../controllers/admin/album.admin.controller");
const { shouldAdmin } = require('../../../helpers/role.helper');
const { authenticate } = require('../../../helpers/auth.helper');
const albumAdminValidation = require('../../../validations/admin/album.admin.validation')

/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.get("/",authenticate,shouldAdmin, albumAdminController.list);
router.post("/add",authenticate,shouldAdmin,validator.body(albumAdminValidation.add), albumAdminController.add)
router.get("/details",authenticate,shouldAdmin,albumAdminController.details);
router.put("/edit/:id",authenticate,shouldAdmin,validator.body(albumAdminValidation.add), albumAdminController.edit)
router.delete("/delete/:id",authenticate,shouldAdmin,albumAdminController.delete);
module.exports = router;
