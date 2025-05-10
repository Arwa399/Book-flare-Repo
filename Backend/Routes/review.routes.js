const {getProductReviews, createReview} = require("../Controllers/review.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = require("express").Router();

router.post("/",authMiddleware, createReview)
router.get("/:productId", getProductReviews);

module.exports = router;