const { DataTypes } = require("sequelize");
const dbConfig = require("../DB/Db.config")

const Order = dbConfig.define("Order", {
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Delivered', 'Cancelled'),
        defaultValue: 'Pending',
    },
    shippingAddress: {
        
        type: DataTypes.JSONB
        ,addressLine: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }});

module.exports = Order;