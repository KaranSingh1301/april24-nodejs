const express = require("express");
const authRouter = express.Router();
const { isAuth } = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/authController");

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", isAuth, logoutController);

module.exports = authRouter;
