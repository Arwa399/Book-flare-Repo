const User = require("../Models/user.model");
const asyncHandler = require("express-async-handler");
const { hashingPassword, comparePassword } = require("../Utilies/hashingPassword");
const { generateToken } = require("../Utilies/jwt");

const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, password, phone, address, role } = req.body;
    console.log(req.body)
    const user = await User.findOne({ where: { email } });
    if (user) {
        return res.status(400).json({ message: "This email already exists!" });
    }

    const hashedPassword = await hashingPassword(password);

    // this variable onlyyyyy for allowing by Postman determined the specific role("admin") : The purpose only for testing in Developing stage
    // const isTesting = test === true;
    // if (!isTesting && role) {
    //     return res.status(400).json({ message: "You cannot specify a role manually." });
    // }
    
    const newUser = await User.create({ username, email, password: hashedPassword, phone, address, role});  //role: isTesting ? role : undefined
    const token = await generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });
    return res.status(201).json({
        message: "Registration Successful!", 
        token
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user)
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials!" });  
    }

    const matchPassword = await comparePassword(password, user.password);
    console.log(matchPassword)
    if (!matchPassword) {
        return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
    });
    return res.status(200).json({
        message: "Login Successfully",
        token,
        user: {
            email: user.email,
            role: user.role
        }
    });
});

module.exports = { RegisterUser, loginUser };
