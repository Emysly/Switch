const ValidationService = require("./ValidationServiceImpl");
const {UserModel} = require("../model/User");
const Utils = require("./Utils");
const JwtService = require("./JwtService");

const createUser = async (userData) => {
    //validate user data
    const {error} = ValidationService.validateUserRegistration(userData);
    if (error) return {success: false, status: 400, message: error.details[0].message}

    //check if user already exists
    const phoneExists = await UserModel.findOne({phoneNumber: userData.phoneNumber});
    if (phoneExists) return {success: false, status: 400, message: "Phone number already exists. Please Login"};

    const emailExists = await UserModel.findOne({email: userData.email});
    if (emailExists) return {success: false, status: 400, message: "Email already exists. Please Login"};


    try {
        const user = await UserModel.create({
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            password: userData.password
        });
        const token = await JwtService.issueToken(user);
        const data = {
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: token
        }
        return {success: true, status: 201, message: "User create successfully!", data};
    } catch (e) {
        console.log(e);
        return {success: false, status: 500, message: e.message};
    }
}

const loginUser = async (userData) => {
    //validate user data
    const {error} = ValidationService.validateUserLogin(userData);
    if (error) return {success: false, status: 400, message: error.details[0].message};

    const user = await UserModel.findOne({phoneNumber: userData.phoneNumber});
    if (!user) return {success: false, status: 400, message: "Invalid credentials"};

    //hash password
    const validPassword = await Utils.validatePassword(userData.password, user.password);

    if (!validPassword) return {success: false, status: 400, message: "Invalid credentials"};

    let token;


    try {
        token = await JwtService.issueToken(user);
        const data = {
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: token
        }
        return {success: true, status: 200, message: "Login successful!", data};
    } catch (e) {
        console.log(e)
        return {success: false, status: 500, message: e.message}
    }
}

const updateUserProfile = async (userData, user) => {
    //validate user data
    const {error} = ValidationService.validateUpdateUser(userData);
    if (error) return {success: false, status: 400, message: error.details[0].message};

    try {
        const updatedUser = await UserModel.findOneAndUpdate({_id: user.user._id}, userData, {new: true});
        if (!updatedUser) {
            return {success: false, status: 400, message: "Error updating user"}
        }
        return {success: true, status: 200, message: "User updated successfully!", data: updatedUser};
    } catch (e) {
        console.log(e);
        return {success: false, status: 500, message: e.message};
    }

}

const changePassword = async (userData, user) => {
    try {
        //update new password
        const updatedUser = await UserModel.findOneAndUpdate({_id: user.user._id}, {password: userData.password}, {new: true}).select("-password");
        return {success: true, status: 200, message: "Password changed successfully", data: updatedUser}
    } catch (e) {
        console.log(`failed to update user password ${user.phoneNumber}, ${e}`)
        return {success: false, status: 500, message: e.message}
    }
}

const resetPassword = async (userData) => {
    try {
        const foundUser = await UserModel.findOne({email: userData.email});

        if (!foundUser) {
            return {success: false, status: 404, message: "User with email not found"}
        }


    } catch (e) {

    }
}

module.exports = {
    createUser,
    loginUser,
    updateUserProfile,
    changePassword,
    resetPassword
}