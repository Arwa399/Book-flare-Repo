const { DataTypes } = require("sequelize");
const dbConfig = require("../DB/Db.config")

const Cart = dbConfig.define("Cart", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: "Users", 
            key: "id"        
        },
        onDelete: "CASCADE"   
    }
})
module.exports = Cart;