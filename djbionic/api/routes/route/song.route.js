const express = require("express");
const router = express.Router();
const songController = require("../../controllers/song.controller");
const { authenticate } = require('../../helpers/auth.helper');

router.get("/",authenticate,songController.list);
router.get("/newsong",authenticate,songController.newsonglist);



module.exports = router;
