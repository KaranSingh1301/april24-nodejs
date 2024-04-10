const express = require("express");
// const fun1 = require("./utils");
// const { fun1, fun2 } = require("./utils");

const app = express();
const PORT = 8000;

//middleware

app.use(express.urlencoded({ extended: true }));

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

app.post("/api/form_submit", (req, res) => {
  console.log("all ok");

  console.log(req.body);

  const { name, email, password } = req.body;

  return res.send("Form submitted successfully");
  //   return res.status(200).json("Form submitted successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
