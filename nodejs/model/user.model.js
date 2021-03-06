const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  avatar: String,
  birthday: String,
  email: String,
  phone: Number,
  history: Array,
  role:String
});

module.exports = mongoose.model("user", user);
