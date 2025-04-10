const { Products } = require("../models/models_data"); // Assurez-vous d'avoir exporté le modèle Products

// Fonction pour ajouter un produit (route POST)
exports.post = async (req, res, next) => {
    try {
        const { product_name, category, price, ingredients, productionDate, expirationDate } = req.body;

        // Créer un nouveau produit dans la base de données
        const newProduct = await Products.create({
            product_name,
            category,
            price,
            ingredients,
            productionDate,
            expirationDate,
        });

        // Répondre avec un message de succès et le produit créé
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

// Fonction pour récupérer tous les produits (route GET)
exports.getAll = async (req, res, next) => {
    try {
        // Récupérer tous les produits dans la base de données
        const products = await Products.findAll();

        // Répondre avec les produits
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve products.",
            error: error.message,
        });
    }
};

//function id only one products 
exports.getId = async (req, res, next) => {
    try {
        // Récupérer tous les produits dans la base de données
        const productId = req.params.id; // Récupérer l'ID depuis les paramètres de la requête
        const product = await Products.findByPk(productId);

        // Répondre avec les produits
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to retrieve products.",
            error: error.message,
        });
    }
};


