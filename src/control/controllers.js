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


