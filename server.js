// //ES5
const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  console.log("api is working");
  return res.send("Server is running");
});

app.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
