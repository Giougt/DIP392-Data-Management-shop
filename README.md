# 🥖 Team X DIP392 – Bakery Manager

Welcome to the official GitHub repository for **Bakery Manager** — a modern inventory management solution.

---

## 🧩 Project Summary

**Bakery Manager** is a web-based application designed to help bakeries efficiently manage their inventory by tracking stock levels and streamlining the ordering process.

Developed for bakers in mid-sized French cities, the system offers:

- Real-time monitoring of raw materials and finished goods
- Smart restocking alerts and supplier order generation
- Waste reduction through accurate stock tracking
- Improved daily operations and organization for bakery staff

---

## ⚙️ Setup and Run Instructions

### Prerequisites

- Node.js (v14.0.0 or higher) and npm (v6.0.0 or higher) installed  
- MySQL installed and running locally (or remote MySQL server access)  
- Git installed on your system  

---

### 1. Clone the Repository

```bash
git clone https://github.com/Giougt/DIP392-Data-Management-shop
cd DIP392-Data-Management-shop

### 2. Install Dependencies
```bash
# Install all dependencies 
npm install
```

### 3. Environment Setup
1. Create a `.env` file in the root directory
2. Create a file db.js in /models:
   ```
   const { Sequelize } = require("sequelize");

/* const connection db */
const NAME = process.env.DB_NAME || "BakeryManagement";
const USER = process.env.DB_USER || "root";
const PASSWORD = process.env.DB_PASSWORD || "your_password";
const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 3306; 

const sequelize = new Sequelize(NAME, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("sucess connexion");
  } catch (error) {
    console.error("Erreur:", error);
  }
})();

module.exports = sequelize;
   ```

### 4. Run the Application

#### Development Mode
```bash
# Start the development server
npm run start
```

### 5. Testing

Use file test.http for send requests.

## Team Members and Roles

| Name              | Student ID   | Role                 |
|-------------------|--------------|----------------------|
| Alexandre LOGUT   | 250AEB021    | Full-Stack Developer |
| Alec MARCHAL      | 250ADB073    |  Designer UX/UI      |
| Clément CROUAN    | 250AEB001    | Front-End Developer  |



## Technology Use

- 📦 **npm** – Dependency management and script automation
- ⚡ **JavaScript** – Core logic and dynamic interactivity
- 🎨 **CSS** – Custom styling and layout control
- 🗄️ **MySQL** – Reliable and structured relational database
- 
