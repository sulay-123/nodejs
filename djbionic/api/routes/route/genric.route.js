const express = require("express");
const router = express.Router();
const genricController = require("../../controllers/genric.controller");
const { authenticate } = require('../../helpers/auth.helper');

router.get("/",authenticate,genricController.list);
router.get("/djlist",authenticate,genricController.djlist);

module.exports = router;
