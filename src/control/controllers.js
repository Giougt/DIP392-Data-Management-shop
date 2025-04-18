const { Products } = require("../models/models_data"); 

// function for add product POST
exports.post = async (req, res, next) => {
    try {
        const { product_name, category, price, ingredients, quantity, productionDate, expirationDate } = req.body;

        // create new product database
        const newProduct = await Products.create({
            product_name,
            category,
            price,
            ingredients,
            quantity,
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
  // for send data from url and body 
    const deleteType = req.body.deleteType || req.query.deleteType;
    let deleteQuery = req.body.deleteQuery || req.query.deleteQuery;
  
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
  
// UPDATE product
exports.updateProduct = async (req, res) => {
  const updateType = req.body.updateType || req.query.updateType;
  let updateQuery = req.body.updateQuery || req.query.updateQuery;
  let quantity = req.body.quantity;

  console.log("Reçu pour mise à jour:", req.body, typeof updateQuery);

  try {
    if (!updateType || !updateQuery || quantity === undefined) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const fieldMap = {
      id: "id",
      name: "product_name",
    };

    if (!fieldMap[updateType]) {
      return res.status(400).json({ error: "Champ de mise à jour invalide" });
    }

    const dbField = fieldMap[updateType];

    if (dbField === "id") {
      updateQuery = parseInt(updateQuery, 10);
      if (isNaN(updateQuery)) {
        return res.status(400).json({ error: "L'id doit être un nombre" });
      }
    } else {
      updateQuery = String(updateQuery).trim();
    }

    quantity = parseInt(quantity, 10);
    if (isNaN(quantity)) {
      return res.status(400).json({ error: "La quantité doit être un nombre" });
    }

    const condition = {};
    condition[dbField] = updateQuery;

    const [updatedCount] = await Products.update(
      { quantity },
      { where: condition }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Produit non trouvé ou déjà à jour" });
    }

    return res.status(200).json({ message: "Quantité mise à jour avec succès" });

  } catch (error) {
    console.error("Erreur mise à jour:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};