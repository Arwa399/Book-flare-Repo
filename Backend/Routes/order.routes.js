const { createOrder, getOrdersUser, getOrderSummary } = require("../Controllers/order.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = require("express").Router();


router.post('/',authMiddleware, createOrder)
router.get('/',authMiddleware, getOrdersUser)
router.get('/summary',authMiddleware, getOrderSummary)


module.exports = router;