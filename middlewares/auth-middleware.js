const { UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const bearerToken = req.headers.Authorization;
    if (!bearerToken && !bearerToken.startsWith("Bearer ")) {
        throw new UnauthorizedError("No token Provided");
    }

    const token = bearerToken.split(" ")[1];
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: payload?.userId,
            username: payload?.username,
            userType: payload?.userType,
        };
        next();
    } catch (error) {
        console.log(error);
        throw new UnauthenticatedError("Authentication Error");
    }
};

module.exports = authMiddleware;
