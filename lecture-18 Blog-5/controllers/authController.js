const User = require("../models/userModel");
const { userDataValidate } = require("../utils/authUtil");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { name, email, password, username } = req.body;

  try {
    await userDataValidate({ name, email, username, password });
    await User.emailAndUsernameExist({ username, email });
  } catch (error) {
    return res.send({
      status: 400,
      message: error,
    });
  }

  try {
    const userObj = new User({ name, email, username, password });
    const userDb = await userObj.registerUser();
    console.log(userDb);
    return res.send({
      status: 201,
      message: "Register successfully",
      data: userDb,
    });
  } catch (error) {
    return res.send({
      statuss: 500,
      message: "Internal server error",
      erro: error,
    });
  }
};

const loginController = async (req, res) => {
  const { loginId, password } = req.body;

  if (!loginId || !password)
    return res.send({
      status: 400,
      message: "Missing credentials",
    });

  try {
    const userDb = await User.findUserWithKey({ key: loginId });

    const isMatch = await bcrypt.compare(password, userDb.password);

    if (!isMatch) {
      return res.send({
        status: 400,
        message: "Incorrect password",
      });
    }

    console.log(req.session);
    req.session.isAuth = true;
    req.session.user = {
      userId: userDb._id,
      email: userDb.email,
    };

    return res.send({
      status: 200,
      message: "Login successfull",
    });
  } catch (error) {
    return res.send({
      statuss: 500,
      message: "Internal server error",
      erro: error,
    });
  }
};

const logoutController = async (req, res) => {
  console.log(req.session);

  req.session.destroy((err) => {
    if (err) {
      return res.send({
        status: 500,
        message: "Logout unsuccesfully",
        error: err,
      });
    }

    return res.send({
      status: 200,
      message: "Logout successfull",
    });
  });
};

module.exports = { registerController, loginController, logoutController };
