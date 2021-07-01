const mongoose = require("mongoose");

//Restaurant details Schema

const restoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Resto", restoSchema);
