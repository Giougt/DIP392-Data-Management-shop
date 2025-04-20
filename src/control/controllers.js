const { Products, User } = require("../models/models_data"); 

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
      // check field is not empty
      if (!deleteType || !deleteQuery) {
        return res.status(400).json({ error: "Field empty" });
      }
  
      // link frontend and backend name
      const fieldMap = {
        id: "id",
        name: "product_name", 
      };
  
      // check field is valid 
      if (!fieldMap[deleteType]) {
        return res.status(400).json({ error: "Field delete incorrect" });
      }
  
      const dbField = fieldMap[deleteType];
  
      // Convert type js
      if (dbField === "id") {
        deleteQuery = parseInt(deleteQuery, 10);
        if (isNaN(deleteQuery)) {
          return res.status(400).json({ error: "ID must be a integer" });
        }
      } else {
        deleteQuery = String(deleteQuery).trim();
      }
  
      const condition = {};
      condition[dbField] = deleteQuery;
      console.log("Deletion condition:", condition);
  
      // delete product
      const result = await Products.destroy({ where: condition });
      console.log("Result of deletion:", result);
  
      if (result === 0) {
        return res.status(404).json({ message: "Product not find " });
      }
  
      return res.status(200).json({ message: "Product delete with sucess" });
  
    } catch (error) {
      console.error("Error delete:", error);
      return res.status(500).json({ error: "Error server" });
    }
  };
  
// UPDATE product
exports.updateProduct = async (req, res) => {
  const updateType = req.body.updateType || req.query.updateType;
  let updateQuery = req.body.updateQuery || req.query.updateQuery;
  let quantity = req.body.quantity;

  console.log("Get for update:", req.body, typeof updateQuery);

  try {
    if (!updateType || !updateQuery || quantity === undefined) {
      return res.status(400).json({ error: "Field are missing" });
    }

    const fieldMap = {
      id: "id",
      name: "product_name",
    };

    if (!fieldMap[updateType]) {
      return res.status(400).json({ error: "Field for update incorrect" });
    }

    const dbField = fieldMap[updateType];

    if (dbField === "id") {
      updateQuery = parseInt(updateQuery, 10);
      if (isNaN(updateQuery)) {
        return res.status(400).json({ error: "ID must be integer" });
      }
    } else {
      updateQuery = String(updateQuery).trim();
    }

    quantity = parseInt(quantity, 10);
    if (isNaN(quantity)) {
      return res.status(400).json({ error: "Quantity must be a number" });
    }

    const condition = {};
    condition[dbField] = updateQuery;

    const [updatedCount] = await Products.update(
      { quantity },
      { where: condition }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Product not find or already update" });
    }

    return res.status(200).json({ message: "Quantity update with sucess" });

  } catch (error) {
    console.error("Error in update:", error);
    return res.status(500).json({ error: "Error server" });
  }
};

// Check value user for connection
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }

    // Connexion réussie
    res.status(200).json({ message: "Connexion réussie", username: user.username });

  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};