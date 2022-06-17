const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voteModel = new Schema({
  vote_id: { type: Number, index: true, unique: true, required: true },
  vote_name: { type: String, index: true, unique: true, required: true },
  vote_desc: { type: String },
  vote_type: { type: String },
});

const vote = mongoose.model("votes", voteModel);

module.exports = vote;
