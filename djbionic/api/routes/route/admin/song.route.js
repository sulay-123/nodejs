const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const songAdminController = require("../../../controllers/admin/song.admin.controller");
const { shouldAdmin } = require('../../../helpers/role.helper');
const { authenticate } = require('../../../helpers/auth.helper');
const songAdminValidation = require('../../../validations/admin/song.admin.validation');
/**
 * @param  {Route} "/user/"
 * @param  {JoiValidationMiddleware} validator.body(authValidation.login)
 */

router.get("/",authenticate,shouldAdmin, songAdminController.list);
router.post("/add",authenticate,shouldAdmin,validator.body(songAdminValidation.add_song), songAdminController.add)
router.get("/details/:id",authenticate,shouldAdmin, songAdminController.details)
router.put("/edit/:id",authenticate,shouldAdmin,validator.body(songAdminValidation.add_song), songAdminController.edit)
router.delete("/delete/:id",authenticate,shouldAdmin,songAdminController.delete);
module.exports = router;
