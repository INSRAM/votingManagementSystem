const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voterListModel = new Schema({
  voter_li_id: { type: Number, index: true, unique: true, required: true },
  voter_li_name: { type: String, index: true, unique: true, required: true },
  voter_li_desc: { type: String },
  voter_li_type: { type: String },
});

const voterList = mongoose.model("voterLists", voterListModel);

module.exports = voterList;
