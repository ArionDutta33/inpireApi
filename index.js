const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/inspireSphereDB")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 3000;
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
