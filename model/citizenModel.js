const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citizenModel = new Schema({
  citizen_id: { type: Number, index: true, unique: true, required: true },
  citizen_name: { type: String, index: true, required: true },
  citizen_mobile: { type: String, index: true, required: true },
  citizen_email: { type: String, index: true, unique: true, required: true },
  citizen_address: { type: String, index: true, required: true },
  citizen_username: { type: String, index: true, unique: true, required: true },
  citizen_password: { type: String, index: true, min: 5, required: true },
  user_role_id: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 4,
  },
});

const citizen = mongoose.model("citizens", citizenModel);

module.exports = citizen;
