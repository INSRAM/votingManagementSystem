const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userRole = new Schema({
  role_id: { type: Number, index: true, unique: true, required: true },
  role_title: { type: String, index: true, unique: true, required: true },
  role_desc: { type: String },
});

const roles = mongoose.model("roles", userRole);

module.exports = roles;
