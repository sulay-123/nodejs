const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/event.controller");
const { authenticate } = require('../../helpers/auth.helper');

router.get("/",authenticate,eventController.list);
router.get("/details",authenticate,eventController.details)


module.exports = router;