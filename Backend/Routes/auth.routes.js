const { RegisterUser, loginUser } = require("../Controllers/auth.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
const userValidation = require("../Validations/userValidation");



const router = require("express").Router();

router.post("/register",userValidation, RegisterUser)
router.post("/login", loginUser)

router.get("/me", authMiddleware, (req,res)=> {
    res.json({user:req.user})
})

module.exports = router