const express = require("express");
const router = express.Router();
const eventController = require("../control/controllers");



router.get("/", eventController.getAll);
router.post("/", eventController.post);
router.get("/:id", eventController.getId);

module.exports = router;
