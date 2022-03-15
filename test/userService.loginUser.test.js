const simple = require("simple-mock");
const { assert } = require("chai");
const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

const ValidationService = require("../services/ValidationServiceImpl");
const UserService = require("../services/UserService");
const { UserModel } = require("../model/User");


describe("UserService.loginUser Test",  () => {

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
            password: "0000000"
        };
        const response = await UserService.createUser(userData);
        console.log(response)
        assert.equal(response.success, false);
        assert.equal(response.status, 400);

    });

    it('should return 400 if user does not exist', async () => {
        const userData = {
            phoneNumber: "11111111111",
            password: "0000000"
        }

        simple.mock(UserModel, "findOne", () => {
            return Promise.resolve(null);
        });

        const response = await UserService.loginUser(userData);
        assert.equal(response.success, false);
        assert.equal(response.status, 400);
        assert.equal(response.message, "Invalid credentials");
    });

    it('should return 400 if credentials do not match', async () => {
        const userData = {
            phoneNumber: "11111111111",
            password: "0000000"
        }

        simple.mock(UserModel, "findOne", () => {
            return Promise.resolve({});
        });

        simple.mock(Bcrypt, "compare", () => {
            return Promise.resolve(null);
        });

        const response = await UserService.loginUser(userData);
        assert.equal(response.success, false);
        assert.equal(response.status, 400);
        assert.equal(response.message, "Invalid credentials");
    });

    it('should return 200 if user login is successful', async () => {
        const userData = {
            phoneNumber: "11111111111",
            password: "0000000"
        }

        simple.mock(UserModel, "findOne", () => {
            return Promise.resolve({});
        });

        simple.mock(Bcrypt, "compare", () => {
            return Promise.resolve({});
        });

        simple.mock(Jwt, "sign", () => {
            return Promise.resolve({});
        });

        const response = await UserService.loginUser(userData);
        assert.equal(response.success, true);
        assert.equal(response.status, 200);
        assert.equal(response.message, "Login successful!");
    });
})