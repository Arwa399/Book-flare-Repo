const User = require("../Models/user.model")
const asyncHandler = require("express-async-handler")
const { hashingPassword } = require("../Utilies/hashingPassword");
const { generateToken } = require("../Utilies/jwt");

const addUserByAdmin = asyncHandler(async (req, res) => {
    const { username, email, password, phone, address, role } = req.body;
    const userRole = role || "user";

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: "This email already exists!" });
    }

    const hashedPassword = await hashingPassword(password);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        phone,
        address,
        role: userRole
    });

    const token = await generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

    return res.status(201).json({
        message: "User added successfully!",
        token
    });
});


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
})

const getProfile = asyncHandler(async (req, res) => {
    const id = req.user.id

    const user = await User.findByPk(id)
    res.json({ user })
})

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (req.user.role !== "admin" && req.user.id != id) {
        return res.status(403).json({ message: "You are not allowed to update this user!" });
    }
    if (data.password) {
        data.password = await hashingPassword(data.password)
    }
    const [_, updatedUsers] = await User.update(data, {
        where: { id: id },
        returning: true
    });
    res.json(updatedUsers[0]);
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (data.password) {
        data.password = await hashingPassword(data.password);
    }

    const [_, updatedUsers] = await User.update(data, {
        where: { id: id },
        returning: true
    });
    console.log("inside patch route")
    res.json(updatedUsers[0]);

})

// Soft Delete
const deactivateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const [_, updatedUser] = await User.update({ active: false }, { where: { id }, returning: true });

    if (updatedUser.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deactivated successfully", user: updatedUser[0] });
})

const reactivateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [_, updatedUser] = await User.update(
        { active: true },
        {
            where: { id, active: false },
            returning: true
        }
    );

    if (!updatedUser.length) {
        return res.status(404).json({ message: "User not found or already active" });
    }

    res.status(200).json({ message: "User restored successfully", user: updatedUser[0] });
});



module.exports = { getAllUsers, getUserById, updateUser, deactivateUser, reactivateUser, getProfile, addUserByAdmin ,updateUserByAdmin}