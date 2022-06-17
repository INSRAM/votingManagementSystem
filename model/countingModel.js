const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countingModel = new Schema({
  counting_id: { type: Number, index: true, unique: true, required: true },
  counting_type: { type: String },
  counting_desc: { type: String },
  counting_name: { type: String, index: true, required: true },
  counting_date: { type: Date, index: true, required: true },
});

const counting = mongoose.model("countings", countingModel);

module.exports = counting;
