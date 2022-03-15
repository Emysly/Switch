const Joi = require("joi");

const registrationSchemaValidation = Joi.object({
    phoneNumber: Joi.string().required().trim(true).pattern(new RegExp("^[+]*[(]?[0-9]{1,4}[)]?[-\\s/0-9]*$")),
    email: Joi.string().email().required().trim(true),
    password: Joi.string().required().min(6),
    name: Joi.string().min(6).trim(true),
    username: Joi.string().alphanum().min(6).max(255).trim(true),
    dob: Joi.string()
        .isoDate()
})

const loginSchemaValidation = Joi.object({
    phoneNumber: Joi.string().required().trim(true).pattern(new RegExp("^[+]*[(]?[0-9]{1,4}[)]?[-\\s/0-9]*$")),
    password: Joi.string().required().min(6)
})

const updateUserSchemaValidation = Joi.object({
    name: Joi.string().min(6).trim(true),
    username: Joi.string().alphanum().min(6).max(255).trim(true),
    dob: Joi.string()
        .pattern(new RegExp("^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$"))
})

const validateUserRegistration = (payload) => {
    return registrationSchemaValidation.validate(payload);
}

const validateUserLogin = (payload) => {
    return loginSchemaValidation.validate(payload);
}

const validateUpdateUser = (payload) => {
    return updateUserSchemaValidation.validate(payload);
}


module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateUpdateUser
}