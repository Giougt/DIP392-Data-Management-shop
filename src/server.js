// import express
const express = require("express");
//import controller
const productRoutes = require("./Route/Routes"); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// route for api
app.use("/products", productRoutes);

app.use(express.static("src/public"));  

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/public/index.html"); 
});

// GET all data products
app.get("/products", (req, res) => {
    const query = "SELECT * FROM Bakery_Products";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error catch products :", err);
            res.status(500).json({ error: "Error Server" });
        } else {
            res.status(200).json(results);
        }
    });
});

// GET one product by ID
app.get("/products", (req, res) => {
    const productId = req.params.id; // Récupère l'ID depuis les paramètres de l'URL
    const query = "SELECT * FROM Bakery_Products WHERE id = ?"; // Requête SQL avec l'ID en paramètre

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error("Error fetching product by ID:", err);
            res.status(500).json({ error: "Error Server" });
        } else if (results.length === 0) {
            res.status(404).json({ error: "Product not found" }); // Retourne une erreur si aucun produit ne correspond
        } else {
            res.status(200).json(results[0]); // Retourne le produit spécifique
        }
    });
});

// start server
app.listen(PORT, () => {
    console.log(` Start server on http://localhost:${PORT}`);
});