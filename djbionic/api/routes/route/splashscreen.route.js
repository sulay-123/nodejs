const express = require("express");
const router = express.Router();
const splacescreenController = require("../../controllers/splacescreen.controller");


router.get("/",splacescreenController.list);


module.exports = router;
