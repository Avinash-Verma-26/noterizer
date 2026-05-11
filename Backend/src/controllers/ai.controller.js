const OpenAI = require("openai");
const notesModel = require("../models/notes.model");
const userModel = require("../models/user.model");

let openAi;
function getOpenAi() {
  if (!openAi) openAi = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  return openAi;
}

/**
 * @name convertNoteToText
 * @description Converts the note to english text based on AI OCR
 * @access Private
 */
async function convertNoteToText(req, res) {
  const { encodedImage } = req.body;
  if (!encodedImage) {
    return res.status(400).json({
      message: "Please provide base64 encoded image to be converted to text",
    });
  }
  const response = await getOpenAi().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${encodedImage}` },
          },
          {
            type: "text",
            text: "Transcribe all text from this image and format it as markdown. Return only the raw markdown content — no code fences, no wrapping backticks, no preamble.",
          },
        ],
      },
    ],
    max_tokens: 2048,
  });

  const text = response.choices[0].message.content;
  return res.status(200).json({ text });
}

/**
 * @name getUserNotes
 * @description Get all notes for the current user from the cookies
 * @access Private
 */
async function getUserNotes(req, res) {
  try {
    const userId = req.user.id;
    const notes = await notesModel.find({ userId });
    return res.status(200).json({ notes });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @name deleteNote
 * @description Delete a note and remove its reference from the user's notes array
 * @access Private
 */
async function deleteNote(req, res) {
  try {
    const { noteId } = req.params;
    const userId = req.user.id;
    await notesModel.findByIdAndDelete(noteId);
    await userModel.findByIdAndUpdate(userId, { $pull: { notes: noteId } });
    return res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete note" });
  }
}

module.exports = { convertNoteToText, getUserNotes, deleteNote };
