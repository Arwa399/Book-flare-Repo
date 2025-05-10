const { DataTypes } = require("sequelize")
const dbConfig = require("../DB/Db.config")

const Review = dbConfig.define("Review", {
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rating: {
    type: DataTypes.DECIMAL(2,1),
    allowNull: false,
    validate: {
        min: 0,
        max: 5
    } 
},
productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "Products",
        key: "id"
    },
    onDelete: "CASCADE"
},
userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "Users",
        key: "id"
    },
    onDelete: "CASCADE"
}
},{indexes: [{
    unique: true,fields:["userId", "productId"]
}]}

)

module.exports = Review;