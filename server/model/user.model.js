const mongoose = require("mongoose");

const cap1Schema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("user", cap1Schema);
