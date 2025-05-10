const { DataTypes } = require("sequelize");
const dbConfig = require("../DB/Db.config")

const OrderItems = dbConfig.define("OrderItems", {
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
module.exports = OrderItems;