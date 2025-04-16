const { Sequelize } = require("sequelize");

/* const connection db */
const NAME = process.env.DB_NAME || "BakeryManagement";
const USER = process.env.DB_USER || "root";
const PASSWORD = process.env.DB_PASSWORD || "";
const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 3306; /*à127.0.0.1 */

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