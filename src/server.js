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

// start server
app.listen(PORT, () => {
    console.log(` Start server on http://localhost:${PORT}`);
});