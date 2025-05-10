const jwt = require("jsonwebtoken")
require("dotenv").config()

function generateToken(payload){
    return jwt.sign(payload, process.env.JWT_SIGNING_KEY, { expiresIn: "1h" } )
}

function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SIGNING_KEY)
}

module.exports = {generateToken, verifyToken}