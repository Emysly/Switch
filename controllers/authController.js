const UserService = require("../services/UserService");

const registerUser = async (req, res) => {

    const userData = req.body;
    UserService.createUser(userData).then(response => {
        const { success, status, message, data } = response;
        if (!success) {
            res.status(status).json({ message });
        }
        res.status(status).json({ message, data })
    }).catch(err => console.log(err))

}

const loginUser = async (req, res) => {
    const userData = req.body;
    UserService.loginUser(userData).then(response => {
        const { success, status, message, data } = response;
        if (!success) {
            res.status(status).json({ message });
        }
        res.header("auth-token", data.auth_token).status(status).json({ message, data })
    }).catch(err => console.log(err))
}

module.exports = {
    registerUser,
    loginUser
}