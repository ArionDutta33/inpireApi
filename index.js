const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user.js");
const blogRoutes = require("./routes/blog.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", blogRoutes);

mongoose
  .connect("mongodb+srv://lunaticdev23:ZtHhDytlhxM0TFYK@cluster0.brj01.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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
