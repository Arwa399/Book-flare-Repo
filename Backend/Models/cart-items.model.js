const { DataTypes } = require("sequelize");
const dbConfig = require("../DB/Db.config")

const CartItems = dbConfig.define("CartItems", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
})
module.exports = CartItems;