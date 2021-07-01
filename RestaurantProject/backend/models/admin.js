const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//admin details schema

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = Admin = mongoose.model("admin", adminSchema);
