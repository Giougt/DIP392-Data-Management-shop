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
                    <td>${product.id || "-"}</td>
                    <td>${product.product_name || "-"}</td>
                    <td>${product.category || "-"}</td>
                    <td>${product.price || "-"}</td>
                    <td>${product.ingredients || "-"}</td>
                    <td>${product.quantity || "0"}</td>
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
        quantity: document.getElementById("quantity").value,
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

// DELETE one product
document.getElementById("button_delete").addEventListener("click", async (event) => {
  event.preventDefault();
  const deleteType = document.getElementById("deleteType").value.trim();
  const deleteQuery = document.getElementById("deleteQuery").value.trim();

  try {
    const response = await fetch("/products/delete-product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleteType, deleteQuery }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Error in delete");
    }

    const data = await response.json();
    alert(data.message || "Sucess delete product !");
    // update data 
    fetchProducts();
    // reset form delete
    document.getElementById("deleteForm").reset();
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
});

// update product
document.getElementById("button_update").addEventListener("click", async (event) => {
  event.preventDefault();
    const updateType = document.getElementById("updateType").value.trim();
    const updateQuery = document.getElementById("updateQuery").value.trim();
    const quantity = document.getElementById("new_quantity").value.trim(); 
  
    try {
      const response = await fetch("/products/update-product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updateType, updateQuery, quantity }), 
      });
  
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error in update");
      }
  
      const data = await response.json();
      alert(data.message || "Product update!");
      // update data 
      fetchProducts();
      // reset form update
      document.getElementById("update-stock-form").reset();
    } catch (error) {
      console.error("Erreur:", error.message);
      alert(error.message);
    }
  });