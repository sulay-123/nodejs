const express = require("express");
const router = express.Router();
const radioController = require("../../../controllers/admin/radio.controller");
const { authenticate } = require('../../../helpers/auth.helper');
const radioAdminValidation = require('../../../validations/admin/radio.admin.validation')
const {validator} = require("../../../helpers/validator.helper");
const { shouldAdmin } = require('../../../helpers/role.helper');
router.get("/",authenticate,radioController.list);
router.put("/update/:id",authenticate,shouldAdmin,validator.body(radioAdminValidation.add),radioController.update)

module.exports = router;
