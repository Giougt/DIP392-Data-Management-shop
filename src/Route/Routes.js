const express = require("express");
const router = express.Router();
const eventController = require("../control/controllers");



router.get("/", eventController.getAll);
router.post("/", eventController.post);
// route for search id 
router.get("/:id", eventController.getId);
// route for delete products

module.exports = router;
