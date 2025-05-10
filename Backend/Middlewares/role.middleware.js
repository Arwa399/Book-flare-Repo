const asyncHandler = require("express-async-handler");


const roleMiddleware = (...allowedRoles) =>{
    return asyncHandler (async (req, res, next) => {
        const userRole = req.user?.role;

        if(!allowedRoles.includes(userRole)) {
            return res.status(403).json({message: "Forbidden. You don't have permission."});
        }

        next();
    })
}
module.exports = roleMiddleware;