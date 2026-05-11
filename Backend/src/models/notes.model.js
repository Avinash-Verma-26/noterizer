const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    transcription: {
      type: String,
      required: true,
    },
    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true },
);

const notesModel = mongoose.model("notes", notesSchema);
module.exports = notesModel;
