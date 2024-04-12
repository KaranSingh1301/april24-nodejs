const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userSchema");
const session = require("express-session");
const isAuth = require("./middleware/isAuthMiddleware");
const mongodbSession = require("connect-mongodb-session")(session);

const app = express();
const PORT = 8000;
const MONGO_URI = `mongodb+srv://karan:12345@cluster0.22wn2.mongodb.net/AprilTestDb`;

const store = new mongodbSession({
  uri: MONGO_URI,
  collection: "sessions",
});

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "This is april nodejs class",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//db connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  return res.send("Server is running");
});

app.get("/register-form", (req, res) => {
  return res.send(
    `
        <html>
        <body>
            <h1>Register Form</h1>
            <form action='/api/register' method='POST'>
                <label for="name">Name</label>
                <input type="text" name="name"/>
                <br/>
                <label for="email">Email</label>
                <input type="text" name="email"/>
                <br/>
                <label for="password">Password</label>
                <input type="text" name="password"/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
        `
  );
});

app.post("/api/register", async (req, res) => {
  console.log("all ok");

  const nameC = req.body.name;
  const emailC = req.body.email;
  const passwordC = req.body.password;

  const userObj = new userModel({
    //schema : client
    name: nameC,
    email: emailC,
    password: passwordC,
  });

  try {
    const userDb = await userObj.save();

    return res.send({
      status: 201,
      message: "User created successfully",
      data: userDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

app.get("/login-form", (req, res) => {
  return res.send(
    `
        <html>
        <body>
            <h1>Login Form</h1>
            <form action='/api/login' method='POST'>
                <label for="email">Email</label>
                <input type="text" name="email"/>
                <br/>
                <label for="password">Password</label>
                <input type="text" name="password"/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
        `
  );
});

app.post("/api/login", async (req, res) => {
  const emailC = req.body.email;
  const passwordC = req.body.password;
  //find the user in DB
  try {
    const userDb = await userModel.findOne({ email: emailC });

    if (!userDb) {
      return res.send({
        status: 400,
        message: "User not found, please register first",
      });
    }

    //compare the password
    if (passwordC !== userDb.password) {
      return res.send({
        status: 400,
        message: "Incorrect password",
      });
    }

    console.log(req.session);
    req.session.isAuth = true;

    return res.send({
      status: 200,
      message: "Login success",
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Data base error",
      error: error,
    });
  }
});

app.get("/home", isAuth, (req, res) => {
  return res.send("Home Page!!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});

//npm i express-session connect-mongodb-session
