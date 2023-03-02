const express = require("express");
const router = express.Router();
const albumController = require("../../controllers/album.controller");
const { authenticate } = require('../../helpers/auth.helper');

router.get("/",authenticate, albumController.list);

module.exports = router;
