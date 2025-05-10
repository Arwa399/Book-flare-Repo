const router = require("express").Router();

const {getProfile, updateUser} = require("../Controllers/user.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");


// => req.user.id
router.get('/profile', authMiddleware, getProfile);
router.patch("/:id", authMiddleware, roleMiddleware("admin", "user"), updateUser)



module.exports = router;