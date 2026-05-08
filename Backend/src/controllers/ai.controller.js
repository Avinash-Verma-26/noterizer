const OpenAI = require("openai");
const notesModel = require("../models/notes.model");
const openAi = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

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
  const response = await openAi.chat.completions.create({
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

module.exports = { convertNoteToText, getUserNotes };
