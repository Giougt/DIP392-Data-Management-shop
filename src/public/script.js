document.getElementById("add-product-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const productData = {
        product_name: document.getElementById("product-name").value,
        category: document.getElementById("category").value,
        price: parseFloat(document.getElementById("price").value),
        ingredients: document.getElementById("ingredients").value,
        productionDate: document.getElementById("production-date").value,
        expirationDate: document.getElementById("expiration-date").value || null
    };

    try {
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            alert("Product added successfully!");
            event.target.reset();
        } else {
            alert("Failed to add the product.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});
