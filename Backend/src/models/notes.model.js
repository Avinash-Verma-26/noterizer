const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    transcription: {
      type: String,
      required: true,
    },
    aiAnalysis: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const notesModel = mongoose.model("notes", notesSchema);
module.exports = notesModel;
