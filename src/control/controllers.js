const { Products } = require("../models/models_data"); 

// function for add product POST
exports.post = async (req, res, next) => {
    try {
        const { product_name, category, price, ingredients, productionDate, expirationDate } = req.body;

        // create new product database
        const newProduct = await Products.create({
            product_name,
            category,
            price,
            ingredients,
            productionDate,
            expirationDate,
        });

        // Response with message and product
        res.status(201).json({
            message: "Product added successfully!",
            product: newProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to add the product.",
            error: error.message,
        });
    }
};

// function get all products
exports.getAll = async (req, res, next) => {
    try {
        // GET all products database
        const products = await Products.findAll();

        // Response with all products
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve all products.",
            error: error.message,
        });
    }
};

//function id only one products 
exports.getId = async (req, res, next) => {
    try {
        // select id
        const productId = req.params.id; // Get id from research 
        const product = await Products.findByPk(productId);

        // Response with products
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve products.",
            error: error.message,
        });
    }
};

//DELETE one products
exports.deleteProduct = async (req, res) => {
    let { deleteType, deleteQuery } = req.body;
  
    console.log("Reçu pour suppression:", req.body, typeof deleteQuery); // Debug
  
    try {
      // Vérifie que les champs sont présents
      if (!deleteType || !deleteQuery) {
        return res.status(400).json({ error: "Champs manquants" });
      }
  
      // Mapping des champs valides côté client → champ en base de données
      const fieldMap = {
        id: "id",
        name: "product_name", // "name" est le nom reçu du front
      };
  
      // Vérifie que le champ demandé est autorisé
      if (!fieldMap[deleteType]) {
        return res.status(400).json({ error: "Champ de suppression invalide" });
      }
  
      const dbField = fieldMap[deleteType];
  
      // Conversion du type si nécessaire
      if (dbField === "id") {
        deleteQuery = parseInt(deleteQuery, 10);
        if (isNaN(deleteQuery)) {
          return res.status(400).json({ error: "L'id doit être un nombre" });
        }
      } else {
        deleteQuery = String(deleteQuery).trim();
      }
  
      const condition = {};
      condition[dbField] = deleteQuery;
      console.log("Condition de suppression:", condition);
  
      // delete product
      const result = await Products.destroy({ where: condition });
      console.log("Résultat de la suppression:", result);
  
      if (result === 0) {
        return res.status(404).json({ message: "Produit non trouvé" });
      }
  
      return res.status(200).json({ message: "Produit supprimé avec succès" });
  
    } catch (error) {
      console.error("Erreur suppression:", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  };
  
