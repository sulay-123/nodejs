const express = require("express");
const router = express.Router();
const playlistController = require("../../controllers/playlist.controller");
const playlistValidation = require("../../validations/playlist.validation");
const {validator} = require("../../helpers/validator.helper");
const { authenticate } = require('../../helpers/auth.helper');

router.post("/add",authenticate,validator.body(playlistValidation.addPlayList),playlistController.addPlayList);
router.get("/list",authenticate,playlistController.getPlayList);
router.get("/remove",authenticate,playlistController.removePlayList)

module.exports = router;
