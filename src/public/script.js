// GET and display products
async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:3000/products", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const products = await response.json();
            console.log("Product catch :", products);

            const tableBody = document.querySelector("#inventory tbody");
            tableBody.innerHTML = ""; // Clear old rows

            products.forEach(product => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${product.product_name || "-"}</td>
                    <td>${product.category || "-"}</td>
                    <td>${product.price || "-"}</td>
                    <td>${product.ingredients || "-"}</td>
                    <td>${product.productionDate || "-"}</td>
                    <td>${product.expirationDate || "-"}</td>
                `;

                tableBody.appendChild(row);
            });
        } else {
            console.error("Error get products.");
        }
    } catch (error) {
        console.error("Error request:", error);
    }
}

// Call function for data
fetchProducts();

// add new product
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
            // reload data in inventory
            fetchProducts();
            event.target.reset();
        } else {
            alert("Failed to add the product.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});