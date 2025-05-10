const asyncHandler = require("express-async-handler");
const  Product  = require("../Models/product.model");
const  Cart = require("../Models/cart.model");
const CartItems = require("../Models/cart-items.model");

const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user.id; 
    const { productId, quantity=1 } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
        cart = await Cart.create({ userId });
    }


    let cartItem = await CartItems.findOne({
        where: {
            CartId: cart.id,
            ProductId: productId,
        }
    });

    if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
    } else {
        const cartItem = await CartItems.create({
            CartId: cart.id,
            ProductId: productId,
            quantity,
            price: product.price
        });

        console.log(cartItem)
    }

    res.status(200).json({ message: "Product added to cart successfully" });
});


const removeProductFromCart = asyncHandler(async (req, res) => {
    const { cartItemId } = req.params; 
    const userId = req.user.id; 
    
    const cart = await Cart.findOne({ where: { userId }
    
    });
    
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem  = await CartItems.findByPk(cartItemId)
    await cart.removeCartItems(cartItem)

    res.status(200).json({ message: "Product removed from cart successfully",cart });
});

const viewCart = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({ where: { userId }, include: [{
        model: CartItems,
        include: [{
            model: Product
        }]
    }] });
    
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }


    let totalCost = 0;
    cart.CartItems.forEach(item => {
        totalCost += item.quantity * parseFloat(item.price)
    });

    res.status(200).json({
        cart,
        totalCost
    });
});

module.exports = {addToCart, removeProductFromCart, viewCart}