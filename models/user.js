const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true, unique: true,index:true },
  password: { type: String, required: true },
  profilePic: { type: String},
  
},{timestamps:true});
module.exports=mongoose.model("User",userSchema);