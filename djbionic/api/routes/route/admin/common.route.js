const express = require("express");
const router = express.Router();
const {validator} = require("../../../helpers/validator.helper");
const commonController = require("../../../controllers/admin/common.admin.controller");
const commonValidation = require("../../../validations/common.validation");
const { authenticate } = require('../../../helpers/auth.helper');
const { shouldAdmin } = require('../../../helpers/role.helper');


router.post("/upload",authenticate,validator.body(commonValidation.upload),commonController.upload);

router.post("/upload/song",authenticate,validator.body(commonValidation.upload),commonController.uploadsong);

/** Get Dashboard */
router.get("/dashboard",authenticate,shouldAdmin,commonController.getdashboard);

router.get("/contact",authenticate,shouldAdmin,commonController.getcontact);
module.exports = router;
