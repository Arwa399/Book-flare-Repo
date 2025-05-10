const { addCategory } = require("../Controllers/category.controller");
const { addProductInCategory } = require("../Controllers/product.controller");
const { getAllUsers, deactivateUser, reactivateUser, getUserById, addUserByAdmin, updateUserByAdmin } = require("../Controllers/user.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");
const productValidation = require("../Validations/productValidation");
const uploads = require("../Middlewares/upload.middleware")

const router = require("express").Router();

router.post("/addUser",authMiddleware, roleMiddleware("admin"), addUserByAdmin)
router.get("/users", authMiddleware,roleMiddleware("admin"), getAllUsers)  
router.get("/users/:id", authMiddleware, roleMiddleware("admin"), getUserById);
router.patch("/users/:id", authMiddleware, roleMiddleware("admin"), updateUserByAdmin)
router.patch("/users/deactivate/:id",authMiddleware, roleMiddleware("admin"), deactivateUser)
router.patch("/users/restore/:id",authMiddleware, roleMiddleware("admin"), reactivateUser)
router.post('/category', authMiddleware, roleMiddleware("admin"), addCategory); 
router.post("/product/category/:categoryId", authMiddleware, roleMiddleware("admin") ,uploads.single("file"),productValidation ,addProductInCategory) 



module.exports = router;