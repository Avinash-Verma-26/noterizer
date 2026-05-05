const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required to be in blacklist"],
    },
  },
  { timestamps: true },
);

const blacklistModel = mongoose.model("blacklist-tokens", blacklistSchema);
module.exports = blacklistModel;
