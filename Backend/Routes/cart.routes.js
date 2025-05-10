const { addToCart, viewCart, removeProductFromCart } = require("../Controllers/cart.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
const CartItems = require("../Models/cart-items.model");
const Cart = require("../Models/cart.model");

const router = require("express").Router();

router.post("/",authMiddleware ,addToCart)
router.delete("/:cartItemId",authMiddleware ,removeProductFromCart)
router.get("/", authMiddleware ,viewCart)

router.patch('/:itemId',authMiddleware, async(req,res) => {
    try {
        const {itemId} = req.params
        const {quantity} = req.body

        const cartItem = await CartItems.findByPk(itemId)
        cartItem.quantity=quantity

        await cartItem.save()

        res.json({message : 'quantity updated successfully'})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router