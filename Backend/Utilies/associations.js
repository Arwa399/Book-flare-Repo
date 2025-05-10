const User = require("../Models/user.model");
const Product = require("../Models/product.model");
const Category = require("../Models/category.model");
const Cart = require("../Models/cart.model");
const Order = require("../Models/order.model");
const Review = require("../Models/review.model");
const CartItems = require("../Models/cart-items.model");
const OrderItems = require("../Models/order-items.model");

const association = () =>{
    Product.belongsTo(Category, {
        foreignKey: "categoryId",
        as: "category"
    });
    Category.hasMany(Product, {
        foreignKey: "categoryId",
        as: "product"
    });

    User.hasOne(Cart, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "cart"
    });
    Cart.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "user"
    });


    Cart.hasMany(CartItems)
    Product.hasMany(CartItems)

    CartItems.belongsTo(Cart)
    CartItems.belongsTo(Product)

    Order.hasMany(OrderItems) 
    Product.hasMany(OrderItems)

    OrderItems.belongsTo(Order)
    OrderItems.belongsTo(Product)


    User.hasMany(Order, {
        foreignKey: "userId", 
        onDelete: "CASCADE",
        as: "orders"
    });
    Order.belongsTo(User, {
        foreignKey: "userId", 
        onDelete: "CASCADE",
        as: "user"
    });

    // Product.belongsToMany(Order, {
    //     through: "OrderProduct",
    //     foreignKey: "productId", 
    //     as: "orders"
    // });
    // Order.belongsToMany(Product, {
    //     through: "OrderProduct",
    //     foreignKey: "orderId",
    //     as: "products"
    // });

    User.hasMany(Review, {
        foreignKey: "userId",
        as: "reviews"
    })
    Product.hasMany(Review,{
        foreignKey: "productId",
        as: "reviews"
    })

    Review.belongsTo(User,{
        foreignKey: "userId", 
        as: "user"
    })
    Review.belongsTo(Product,{
        foreignKey: "productId", 
        as: "product"
    })
}
module.exports = association;