const jwt = require("jsonwebtoken");

const issueToken = async (user) => {
    return await jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}

module.exports = {
    issueToken
}