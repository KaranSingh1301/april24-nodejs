const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userSchema");

const app = express();
const PORT = 8000;
const MONGO_URI = `mongodb+srv://karan:12345@cluster0.22wn2.mongodb.net/AprilTestDb`;

//middleware
app.use(express.urlencoded({ extended: true }));

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

app.get("/get-form", (req, res) => {
  return res.send(
    `
        <html>
        <body>
            <h1>User Form</h1>
            <form action='/api/form_submit' method='POST'>
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

app.post("/api/form_submit", async (req, res) => {
  console.log("all ok");

  console.log(req.body);

  const nameC = req.body.name;
  const emailC = req.body.email;
  const passwordC = req.body.password;

  const userObj = new userModel({
    //schema : client
    name: nameC,
    email: emailC,
    password: passwordC,
  });

  console.log(userObj);

  try {
    const userDb = await userObj.save();
    console.log(userDb);
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

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
