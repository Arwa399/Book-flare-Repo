const { DataTypes } = require("sequelize")
const dbConfig = require("../DB/Db.config")

const Category = dbConfig.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Category;