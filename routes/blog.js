const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const router = express.Router();
router.get(
  "/blogs",
  asyncHandler(async (req, res) => {
    const blogs = await BLog.find();
    res.status(200).json({ blogs });
  })
);

router.post("/blogs",verifyToken, async (req, res) => {
  // try {
  //   const { title, body } = req.body;
  //   if (!title || !body) {
  //     return res.status(401).json({ message: "All fields are required" });
  //   }

  //   const newBlog = new Blog({
  //     title,
  //     body,
  //     category: "Health & Wellness",
  //     // image,
  //     user_id: "672488d6aec5b0634bb334e8",
  //   });
  //   await newBlog.save();
  //   res.status(200).json({ newBlog });
  // } catch (error) {
  //   console.log(error);
  // }
  res.send("hello world");
});

module.exports = router;
