const { Model, DataTypes } = require("sequelize");
const connection = require("/models/db"); 

/* one models per page*/


/* model for products*/

class Products extends Model {}

Products.init(
    {
        product_name: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: { 
            type: DataTypes.ENUM("Bread", "Pastry", "Patisserie", "Snack"),
            allowNull: false,
        },
        price: { 
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ingredients: { 
            type: DataTypes.TEXT,
            allowNull: true,
        },
        productionDate: { 
            type: DataTypes.DATE,
            allowNull: false,
        },
        expirationDate: { 
            type: DataTypes.DATE,
            allowNull: true,
        },
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        sequelize: connection,
        tableName: "Bakery_Products", 
        timestamps: true, 
    }
);


/*model for stocks*/
class Stock extends Model {}

Stock.init(
    {
        product_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Bakery_Products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        restock_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize: connection,
        tableName: "Stock",
        timestamps: true,
    }
);

/*model for order*/

class Order extends Model {}

Order.init(
    {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Bakery_Products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize: connection,
        tableName: "Orders",
        timestamps: true,
    }
);


/* (option)model for money*/

class Money extends Model {}

Money.init(
    {
        transaction_type: {
            type: DataTypes.ENUM("Income", "Expense"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        transaction_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize: connection,
        tableName: "Money_Transactions",
        timestamps: true,
    }
);


module.exports = {Products, Stock, Order, Money};