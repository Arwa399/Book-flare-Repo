const express = require("express");
const dbConfig = require("./DB/Db.config");
const userModel = require("./Models/user.model");
const productModel = require("./Models/product.model");
const categoryModel = require("./Models/category.model");
const cartModel = require("./Models/cart.model");
const cartItemsModel = require("./Models/cart-items.model");
const orderModel = require("./Models/order.model");
const reviewModel = require("./Models/review.model");
const userRoutes = require("./Routes/user.routes");
const adminRoutes = require("./Routes/admin.routes");
const authRoutes = require("./Routes/auth.routes");
const categoriesRoute = require("./Routes/category.routes")
const productRoutes = require("./Routes/product.routes");
const cartRoutes = require("./Routes/cart.routes");
const orderRoutes = require("./Routes/order.routes");
const reviewRoutes = require("./Routes/review.routes");


const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const association = require("./Utilies/associations");
const { hashingPassword } = require("./Utilies/hashingPassword");

association()


const app = express();
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors({
    origin: '*'
}));


app.use("/users", userRoutes)
app.use("/admin", adminRoutes)
app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/categories", categoriesRoute)
app.use("/cart/items" , cartRoutes)
app.use("/orders", orderRoutes)
app.use("/products/review", reviewRoutes)

const startServer = async () => {
    try {
        await dbConfig.authenticate();
            console.log("DB is connected Successfully")

            await dbConfig.sync({ alter: true, force: false });
            const count = await userModel.count();

        if (count === 0) { 
            const hash = await hashingPassword("1234546, 10")
            await userModel.bulkCreate([{
                    username: 'mohamed789',
                    email: 'mohamed@example.com',
                    password: hash,
                    phone: '01112345678',
                    address: 'Alexandria, Egypt',
                    role: 'user',
                },
                {
                    username: 'dina321',
                    email: 'dina@example.com',
                    password: hash,
                    phone: '01298765432',
                    address: 'Aswan, Egypt',
                    role: 'user',
                },
                {
                    username: 'ahmed007',
                    email: 'ahmed007@example.com',
                    password: hash,
                    phone: '01024681357',
                    address: 'Sharm El Sheikh, Egypt',
                    role: 'admin',
                },
                {
                    username: 'leila2021',
                    email: 'leila2021@example.com',
                    password: hash,
                    phone: 'password2021' ,
                    address: 'Hurghada, Egypt',
                    role: 'user',
                },
                {
                    username: 'khaled999',
                    email: 'khaled999@example.com',
                    password: hash,
                    phone: '01234567890',
                    address: 'Mansoura, Egypt',
                    role: 'user',
                },
                {
                    username: 'fatma1122',
                    email: 'fatma1122@example.com',
                    password: hash,
                    phone: '01013579246',
                    address: 'Tanta, Egypt',
                    role: 'user',
                },
                {
                    username: 'omar555',
                    email: 'omar555@example.com',
                    password: hash,
                    phone: '01198765432',
                    address: 'Cairo, Egypt',
                    role: 'admin',
                }
                
            ]);
            console.log('Dummy data inserted successfully.');
        } else {
            console.log('Dummy data already exists.');
        }
            app.listen(3000, () =>{
                console.log("Server is running on port 3000")
            });
    } catch (error) {
        console.log("Error connecting to the database:", error)
    }
};
startServer();

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Something went wrong' });
});