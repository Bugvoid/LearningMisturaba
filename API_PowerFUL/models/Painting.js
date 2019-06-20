const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaintingSchema = new Schema({
  nome: String,
  url: String,
  techniques: [String]
});

module.exports = mongoose.model("Painting", PaintingSchema);
