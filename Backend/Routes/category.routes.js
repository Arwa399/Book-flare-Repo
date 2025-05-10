const { getCategories } = require("../Controllers/category.controller");
const {getProductsByCategory } = require("../Controllers/product.controller");


const router = require("express").Router();


router.get('/', getCategories);
router.get("/:categoryId", getProductsByCategory)


module.exports = router