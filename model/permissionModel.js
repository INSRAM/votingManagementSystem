const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userPermission = new Schema({
  perm_id: { type: Number, index: true, unique: true, required: true },
  perm_role_id: { type: Number, index: true, required: true },
  perm_title: { type: String, index: true, required: true },
  perm_module: [String],
  perm_desc: { type: String },
});

const permission = mongoose.model("permissions", userPermission);

module.exports = permission;
