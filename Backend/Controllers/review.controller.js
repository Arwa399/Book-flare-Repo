const asyncHandler = require("express-async-handler");
const Review = require("../Models/review.model");
const User = require("../Models/user.model");
const Product = require("../Models/product.model");


const createReview = asyncHandler(async(req, res) =>{
    const userId = req.user.id;
    const {comment, rating, productId} = req.body;

    console.log({text:comment, rating, productId, userId})
    const review = await Review.create({text:comment, rating, productId, userId})
    res.status(201).json(review);
})

const getProductReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const reviews = await Review.findAll({
        where: { productId },
        attributes: ['text', 'rating'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['username']
            },
            {
                model: Product,
                as: 'product',
                attributes: ['name']
            }
        ]
    });
    
    res.status(200).json({reviews});
});



module.exports = {createReview, getProductReviews };