const express = require("express");
const router = express.Router();
const playlistsongController = require("../../controllers/playlistsong.controller");
const playlistsongValidation = require("../../validations/playlistsong.validation");
const {validator} = require("../../helpers/validator.helper");
const { authenticate } = require('../../helpers/auth.helper');

router.post("/add",authenticate,validator.body(playlistsongValidation.addPlayListsong),playlistsongController.addPlayListsong);
router.get("/list",authenticate,playlistsongController.getPlayListsong);
router.get("/remove",authenticate,playlistsongController.removePlayListsong)

module.exports = router;
