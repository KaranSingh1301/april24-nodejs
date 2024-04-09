// //ES5
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("api is working");
  return res.send("Server is running");
});

// /api?key=val

app.get("/api", (req, res) => {
  console.log(req.query);
  return res.send(`Query val : ${req.query.key}`);
});

app.get("/api1", (req, res) => {
  console.log(req.query);
  const query_val = req.query.key.split(",");
  console.log(query_val);
  const key1 = query_val[0];
  const key2 = query_val[1];
  return res.send(`Query val1 : ${key1} and val2 : ${key2}`);
});

//api?key1=100&key2=200
app.get("/api2", (req, res) => {
  console.log(req.query);
  const { key1, key2 } = req.query;
  return res.send(`Query key1 : ${key1} and key2 : ${key2}`);
});

app.get("/profile/:name", (req, res) => {
  console.log(req.params);
  return res.send(`Value of param :${req.params.name}`);
});

app.get("/profile/:id/name", (req, res) => {
  console.log(req.params);
  return res.send(`Value of param :/profile/${req.params.id}/name`);
});

app.listen(8000, () => {
  console.log("Server is running on PORT:8000");
});
