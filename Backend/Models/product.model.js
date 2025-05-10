const { DataTypes } = require("sequelize")
const dbConfig = require("../DB/Db.config")

const Product = dbConfig.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stockLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,  // security for DB (NULL ❌)
    } 
})

module.exports = Product;