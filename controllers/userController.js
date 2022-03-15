const UserService = require("../services/UserService");

const createUserProfile = (req, res) => {
    const userData = req.body;
    const user = req.user;

    UserService.updateUserProfile(userData, user)
        .then(response => {
        const { success, status, message, data } = response;
        if (!success) {
            res.status(status).json({ message });
        }
        res.status(status).json({ message, data })
    }).catch(err => console.log(err))
}

const changePassword = (req, res) => {
    const userData = req.body;
    const user = req.user;

    UserService.changePassword(userData, user)
        .then(response => {
            const { success, status, message, data } = response;
            if (!success) {
                res.status(status).json({ message });
            }
            res.status(status).json({ message, data })
        }).catch(err => console.log(err))
}

const resetPassword = (req, res) => {
    const userData = req.body;

    UserService.resetPassword(userData)
        .then(response => {
            const { success, status, message, data } = response;
            if (!success) {
                res.status(status).json({ message });
            }
            res.status(status).json({ message, data })
        }).catch(err => console.log(err))
}

module.exports = {
    createUserProfile,
    changePassword,
    resetPassword
}