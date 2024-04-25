const express = require("express");
require("dotenv").config();
const clc = require("cli-color");

//file-imports
const db = require("./db");
const authRouter = require("./routers/authRouter");

const app = express();
const PORT = process.env.PORT;

//middleware
//auth/login
//auth/register
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(clc.yellowBright.underline(`Server is running on PORT: ${PORT}`));
});
