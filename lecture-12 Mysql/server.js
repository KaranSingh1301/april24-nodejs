const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());

//db instance

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Karan@130101",
  database: "april24mysqldb",
  multipleStatements: true,
});

///db connection
db.connect((err) => {
  // db.query("CREATE DATABASE testDb", function(err, result){
  //   if (err) throw err;
  //   console.log("Mysql db has been connected");
  // })

  console.log("Mysql db has been connected");
});

app.get("/", (req, res) => {
  return res.send("Server is running");
});

app.get("/get-user", (req, res) => {
  db.query("SELECT * FROM user", {}, (err, data) => {
    if (err) return res.status(500).json("Internal server error");
    console.log(data);
    return res.status(200).json(data);
  });
});

app.post("/create-user", (req, res) => {
  const { id, name, email, password } = req.body;
  db.query(
    `INSERT INTO user (id, name, email, password) values (?,?,?,?)`,
    [id, name, email, password],
    (err, data) => {
      console.log(err);
      if (err) return res.status(400).json(err);

      console.log(data);

      return res.status(201).json("user created successfully");
    }
  );
});

app.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
