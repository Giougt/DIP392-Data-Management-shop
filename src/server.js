// import express
const express = require("express");
//import controller
const productRoutes = require("./Route/Routes"); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Préfixez les routes avec "/api"
app.use("/products", productRoutes);


app.use(express.static("src/public"));  

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/public/index.html"); 
});

// 6. Démarrer le serveur sur le port spécifié
app.listen(PORT, () => {
    console.log(` Start server on http://localhost:${PORT}`);
});