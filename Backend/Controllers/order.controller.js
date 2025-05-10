const asyncHandler = require("express-async-handler");
const Order = require("../Models/order.model");
const CartItems = require("../Models/cart-items.model");
const OrderItems = require("../Models/order-items.model");
const Product = require("../Models/product.model");
const { or } = require("sequelize");

const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { cart } = req.body;

    const order = await Order.create({
        userId,
        totalPrice: cart.totalCost
    });
    const orderId = order.id;

    const orderItems = cart.cartItem.map(item => ({
        orderId: orderId, 
        ProductId: item.ProductId,
        quantity: item.quantity,
        price: item.price
    }));

    await OrderItems.bulkCreate(orderItems);

    for (const item of cart.cartItem) {
        await Product.decrement('quantity', {
            by: item.quantity,
            where: { id: item.ProductId }
        });
    }
    await CartItems.destroy({
        where: { userId }
    });

    res.status(200).json({
        order,
        totalCost: cart.totalCost
    });
});


const getOrdersUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const orders = await Order.findAll({
        where: { userId },
        include: [{ model: Product, as: "products",
            attributes: ['name', 'price', 'image']
        }]
    });
    res.json(orders);
});

const getOrderSummary = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const orders = await Order.findAll({
        where: { userId },
        include: [
            {
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'price', 'image'],
                through: {
                    attributes: ['quantity'], 
                }
            }
        ],
    });

    if (!orders.length) {
        return res.status(200).json({ message: 'You have no orders yet.' });
    }

    const summary = orders.map(order => {
        let total = 0;
        const items = order.products.map(prod => {
            const quantity = prod.OrderProduct.quantity;
            const subtotal = quantity * prod.price;
            total += subtotal;
            return {
                productId: prod.id,
                name: prod.name,
                image: prod.image,
                price: prod.price,
                quantity,
                subtotal
            };
        });

        return {
            orderId: order.id,
            status: order.status,
            createdAt: order.createdAt,
            items,
            total
        };
    });

    res.status(200).json({ orders: summary });
});


module.exports = {createOrder , getOrdersUser, getOrderSummary}