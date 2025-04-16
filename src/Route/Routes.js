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
      // Si l'appel à deleteProduct échoue, on envoie une erreur générique
      console.error("Erreur lors de la suppression:", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });

module.exports = router;
