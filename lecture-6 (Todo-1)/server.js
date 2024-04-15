const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//file-import
const { userDataValidation } = require("./utils/authUtils");
const userModel = require("./models/userModel");

//constants
const app = express();
const PORT = process.env.PORT || 8000;

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.render("server");
});

app.get("/register", (req, res) => {
  return res.render("registerPage");
});

app.post("/register-user", async (req, res) => {
  const { name, email, username, password } = req.body;

  //data validation
  try {
    await userDataValidation({ name, username, password, email });
  } catch (error) {
    return res.send({
      status: 400,
      error: error,
    });
  }

  try {
    //check is email exist
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json("Email already exist");
    }

    //check if username exist

    const isUsernameExist = await userModel.findOne({ username });
    if (isUsernameExist) {
      return res.status(400).json("Username already exist");
    }

    //hashing of the password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );

    const userObj = new userModel({
      name: name,
      email: email,
      username: username,
      password: hashedPassword,
    });

    //store the data
    const userDb = await userObj.save();

    return res.send({
      status: 201,
      message: "Register successfully",
      data: userDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
});

app.get("/login", (req, res) => {
  return res.render("loginPage");
});

app.listen(PORT, () => {
  console.log("Server is running:");
  console.log(`http://localhost:${PORT}/`);
});
