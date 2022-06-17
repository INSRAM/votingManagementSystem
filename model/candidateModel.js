const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const candidateModel = new Schema({
  candidate_id: { type: Number, index: true, unique: true, required: true },
  candidate_name: { type: String, index: true, required: true },
  candidate_mobile: { type: String, index: true, required: true },
  candidate_email: { type: String, index: true, unique: true, required: true },
  candidate_address: { type: String, index: true, required: true },
  candidate_username: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  candidate_password: { type: String, index: true, min: 5, required: true },
  user_role_id: {
    type: Number,
    enum: [1, 2, 3, 4],
    default: 3,
  },
});

const candidate = mongoose.model("candidates", candidateModel);

module.exports = candidate;
