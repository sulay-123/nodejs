const express = require("express");
const router = express.Router();
const commonController = require("../../controllers/common.controller");

/**
 * Route For getting list of Swagger JSON Files to index.html inside api-docs.
 */
router.get("/getApiDocs", commonController.getApiDocs);

module.exports = router;
