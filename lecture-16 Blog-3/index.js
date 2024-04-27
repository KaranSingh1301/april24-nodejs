const express = require("express");
require("dotenv").config();
const clc = require("cli-color");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

//file-imports
const db = require("./db");
const authRouter = require("./routers/authRouter");
const blogRouter = require("./routers/blogRouter");
const { isAuth } = require("./middlewares/authMiddleware");

//constants
const app = express();
const PORT = process.env.PORT;
const store = new mongodbSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

//middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/auth", authRouter);
app.use("/blog", isAuth, blogRouter);

app.listen(PORT, () => {
  console.log(clc.yellowBright.underline(`Server is running on PORT: ${PORT}`));
});

//server.js <---->router<---->controllers obj <---->models (DB) class <----->Schema (class)
