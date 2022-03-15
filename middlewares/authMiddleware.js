const jwt = require("jsonwebtoken");
const { JWT_SECRET} = process.env;

const verifyToken = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.user = await jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(403).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;