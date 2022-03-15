const assert = require('chai').assert;
const simple = require("simple-mock");
const Jwt = require("jsonwebtoken");

const UserService = require("../services/UserService");
const { UserModel } = require("../model/User");
const ValidationService = require("../services/ValidationServiceImpl");
const Utils = require("../services/Utils");


describe("UserService.createUser Test ", () => {

    beforeEach(() => {
        simple.mock(ValidationService, "validateUserRegistration", () => {
            return {};
        });
    });

    afterEach(() => {
        simple.restore();
    });

    it('should return 400 if validation fails', async () => {
        simple.mock(ValidationService, "validateUserRegistration", () => {
            return {error: {
                details: [{
                    message: ""
                }]
                }};
        });
        const userData = {
            phoneNumber: "00000000000",
            email: "test@gmail.com",
            password: "0000000"
        };
        const response = await UserService.createUser(userData);
        assert.equal(response.success, false);
        assert.equal(response.status, 400);

    });

    it('should return 400 if user exists', async () => {
        const userData = {
            phoneNumber: "00000000000",
            email: "test@gmail.com",
            password: "0000000"
        };

        simple.mock(ValidationService, "validateUserRegistration", () => {
            return {};
        });

        simple.mock(UserModel, "findOne", () => {
            return Promise.resolve({phoneNumber: "00000000000"});
        });

        const response = await UserService.createUser(userData);
        console.log(response)
        assert.equal(response.success, false);
        assert.equal(response.status, 400);

    });

    it('should return 201 if user is successfully created', async () => {
        const userData = {
            phoneNumber: "11111111111",
            email: "test1@gmail.com",
            password: "0000000"
        };

        simple.mock(UserModel, "findOne", () => {
            return Promise.resolve();
        });

        simple.mock(Utils, "hashPassword", () => {
            return Promise.resolve("u2w29d2yu2uhs29y82jwhsq9812$$");
        });

        simple.mock(UserModel, "create", () => {
            return Promise.resolve({
                phoneNumber: "11111111111",
                email: "test1@gmail.com",
                password: "u2w29d2yu2uhs29y82jwhsq9812$$"
            });
        });

        simple.mock(Jwt, "sign", () => {
            return Promise.resolve("");
        });

        console.log(userData)
        const response = await UserService.createUser(userData);
        console.log(response)
        assert.equal(response.success, true);
        assert.equal(response.status, 201);
        assert.equal(response.message, 'User create successfully!');
    });
})