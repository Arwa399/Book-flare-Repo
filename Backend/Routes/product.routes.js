const router = require("express").Router();
const { getAllProducts, getProductByName, updateProduct, deleteProduct, getFilteredProducts, getProductById } = require("../Controllers/product.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");
const uploadMiddleware = require("../Middlewares/upload.middleware");



router.get("/", getAllProducts)
router.get("/filter" , getFilteredProducts) // مهم أوي اننا نحط الراوت دي قبل اللي تحتها لان دي ثابته على  عكس الاي دي متغير
router.get("/search", getProductByName)
router.get("/:id", getProductById)
router.patch("/:id", authMiddleware, roleMiddleware("admin"), uploadMiddleware.single('file'), updateProduct)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProduct)

module.exports = router;