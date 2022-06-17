const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
  user_id: { type: Number, index: true, unique: true, required: true },
  user_role_id: { type: Number, required: true },
  user_name: { type: String, required: true },
  user_email: { type: String, index: true, unique: true, required: true },
  user_password: { type: String, index: true, min: 5, required: true },
  user_dob: { type: Date, required: true },
  user_address: { type: String, required: true },
});

const user_ = mongoose.model("users", userModel);

module.exports = user_;
