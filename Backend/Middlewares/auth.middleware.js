const { verifyToken } = require("../Utilies/jwt");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(req.headers["authorization"])

    if (!token) {
        return res.status(401).json({ message: "Authentication failed!" });
    }

    const decoded = await verifyToken(token); 
    req.user = decoded;
    next();
});

module.exports = authMiddleware;
