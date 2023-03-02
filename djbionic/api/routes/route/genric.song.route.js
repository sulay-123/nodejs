const express = require("express");
const router = express.Router();
const genricSongController = require("../../controllers/genric.song.controller");
const { authenticate } = require('../../helpers/auth.helper');
const { shouldlogin } = require('../../helpers/role.helper');

router.get("/",authenticate,genricSongController.list);
router.get("/djsong",authenticate,shouldlogin,genricSongController.djsonglist)


module.exports = router;
