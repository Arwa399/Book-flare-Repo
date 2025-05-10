const asyncHandler = require("express-async-handler");
const { Sequelize, fn, col } = require("sequelize");
const Product = require("../Models/product.model")
const Category = require("../Models/category.model");
const Review = require("../Models/review.model")
const { Op } = require('sequelize');

const addProductInCategory = asyncHandler(async(req, res) => {
    console.log(req.body)
    const { name, price, description, stockLevel } = req.body;
    const image = req.file.filename;
    console.log(req.file);

    const categoryId = req.params.categoryId;
    console.log(categoryId)

    const existingProduct = await Product.findOne({ where: { name } });

    if (existingProduct) {
        return res.status(400).json({ message: "Product with this name already exists" });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }
    
    const newProduct = await Product.create({ name, price, description, image, stockLevel, categoryId });

    // await newProduct.addCategory(categoryId);

    res.status(201).json({
        message: 'Product added successfully',
        product: newProduct
    });
    
});


// for user
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.findAll({
        attributes: [
            "id",
            "name",
            "price",
            "description",
            "image",
            "stockLevel",
            "categoryId",
            [
                Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
                "averageRating"
            ]
        ],
        include: [
            {
                model: Review,
                as: 'reviews', 
                attributes: [],
            },
        ],
        group: ["Product.id"],
    });

    products.forEach(product => {
        if (product.averageRating === null) {
            product.averageRating = 0; 
        }
    });

    res.status(200).json(products);
});

//product Details
const getProductById = asyncHandler(async(req, res) =>{
    const id = req.params.id;
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product)
})
// product search
const getProductByName = asyncHandler(async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ message: "Please provide a product name" });
    }

    const products = await Product.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%` // دي معناها هيسيرش بغض النظر عن الcase sensetive
            }
        },
        include: [
            {
                model: Category,
                as: 'categories',
                attributes: ['id', 'name'],
                through: { attributes: [] } 
            }
        ]
    });

    if (products.length === 0) {
        return res.status(404).json({ message: "No products found with that name." });
    }

    res.status(200).json(products);
});

const getProductsByCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;

    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
}

    const products = await Product.findAll({
        include: {
            model: Category,
            as: 'category',
            where: { id: categoryId },
            attributes: ['id', 'name'],
            through: { attributes: [] }
        }
    });
    res.json(products);
});

//filter by category, price and rating
const getFilteredProducts = asyncHandler(async (req, res) => {
    const { categoryId, minPrice, maxPrice, minRating } = req.query;
    const filters = {};

    if (categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
    
        filters['$categories.id$'] = categoryId;
    }
    
    if (minPrice || maxPrice) {
        filters['price'] = {};
        if (minPrice) filters['price'][Op.gte] = parseFloat(minPrice);
        if (maxPrice) filters['price'][Op.lte] = parseFloat(maxPrice);
    }
    

    // minRating ...

    console.log(filters)
    const products = await Product.findAll({
        where: filters,
        include: [
            {
                model: Category,
                as: 'category',
                required: true, // عشان هنا لازم اربط البرودكت بالكاتيجريز بتاعته
                attributes: ['id', 'name'],
                through: { attributes: [] }
            },
            {
                model: Review,
                as: 'reviews',
                required: false,
                attributes: [],
            },
        ],
        attributes: [
            'name',
            'price',
            'description',
            'image',
            'stockLevel',
            [Sequelize.fn('AVG', Sequelize.col('reviews.rating')), 'averageRating']
        ],
        group: ['Product.id', 'categories.id'],
        having: Sequelize.literal(`AVG("reviews"."rating") >= ${parseFloat(minRating) || 0}`)
    });


    res.status(200).json(products);
});


const updateProduct = asyncHandler(async(req, res) =>{
    const id = req.params.id;
    const data = req.body;
    console.log(data)
    // const file = req.file

    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const [_, updateProduct] = await Product.update(data, {
        where: {id },
        returning: true
    });   
    res.json(updateProduct[0]);
})

const deleteProduct = asyncHandler(async (req, res) => {
        const productId = req.params.id;
    
        console.log(productId)
        const product = await Product.findByPk(productId);
    
        if (!product) {
        return res.status(404).json({ message: 'Product not found' });
        }
    
        await product.destroy();
    
        res.status(200).json({ message: 'Product and its category relationships deleted' });
    });

module.exports = {addProductInCategory,getAllProducts,getProductById, getProductByName, getProductsByCategory,getFilteredProducts, updateProduct, deleteProduct}