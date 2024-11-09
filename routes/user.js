const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { fullname, email, password ,profilePic} = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
     const defaultProfilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s';
    const finalProfilePic = req.body.profilePic || defaultProfilePic;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      profilePic: finalProfilePic,
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, isUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }
    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const newUser = await User.findOne({ email }).select("-password");
    return res.status(200).json({
      message: "Login successful",
      token,
      user: newUser,
    });
  })
);

router.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  })
);
module.exports = router;
