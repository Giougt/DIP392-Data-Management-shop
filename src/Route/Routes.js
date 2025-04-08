const express = require("express");
const router = express.Router();
const eventController = require("../control/controllers");



router.get("/", eventController.cget);
router.post("/", eventController.post);

module.exports = router;
