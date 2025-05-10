const  Category  = require('../Models/category.model');
const asyncHandler = require("express-async-handler");

const addCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
});

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).json(categories);
});

module.exports = { addCategory, getCategories };
