const bcrypt = require("bcryptjs");

const hash = async (item) => {
    const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT);
    return await bcrypt.hash(item, salt);
}

const validatePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

module.exports = {
    hash,
    validatePassword
}