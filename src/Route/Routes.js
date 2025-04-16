const express = require("express");
const router = express.Router();
const eventController = require("../control/controllers");



router.get("/", eventController.getAll);
router.post("/", eventController.post);
// route for search id 
router.get("/:id", eventController.getId);
// route for delete products
router.delete("/delete-product", async (req, res) => {
    try {
      await eventController.deleteProduct(req, res);
    } catch (error) {
      // send error 
      console.error("Error in delete :", error);
      res.status(500).json({ error: "Error server" });
    }
  });

module.exports = router;
