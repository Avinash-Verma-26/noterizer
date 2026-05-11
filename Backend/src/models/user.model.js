const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email has to be unique"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "notes" }],
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
