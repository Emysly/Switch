const router = require("express").Router();

const AuthController = require("./controllers/authController");
const UserController = require("./controllers/userController");
const  authenticate  = require("./middlewares/authMiddleware");


// AUTH ROUTES
router.post("/api/v1/auth/register", AuthController.registerUser);
router.post("/api/v1/auth/login", AuthController.loginUser)

// USER ROUTES
router.put("/api/v1/user", authenticate, UserController.createUserProfile);
router.put("/api/v1/user/changePassword", authenticate, UserController.changePassword);
router.put("/api/v1/user/resetPassword", UserController.resetPassword);

module.exports = router;