const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route POST /api/auth/logout
 * @description Logout the user remove cookies and add token to blacklist
 * @access Private
 */
authRouter.post("/logout", authUser, authController.logoutUserController);

/**
 * @route GET /api/auth/getMe
 * @description Gets the current logged in user details
 * @access Private
 */
authRouter.get("/getMe", authUser, authController.getMeController);

module.exports = authRouter;
