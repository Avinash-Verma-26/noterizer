const OpenAI = require("openai");
const notesModel = require("../models/notes.model");
const userModel = require("../models/user.model");
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

/**
 * @name addUserNote
 * @description Save a converted note to the notes collection and link it to the user
 * @access Private
 */
async function addUserNote(req, res) {
  try {
    const { title, transcription } = req.body;
    if (!title || !transcription) {
      return res.status(400).json({ message: "Title and transcription are required" });
    }
    const userId = req.user.id;
    const note = await notesModel.create({ userId, title, transcription });
    await userModel.findByIdAndUpdate(userId, { $push: { notes: note._id } });
    return res.status(201).json({ note });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to save note" });
  }
}

/**
 * @name analyzeNote
 * @description Analyze an existing note with GPT-4o and persist the result
 * @access Private
 */
async function analyzeNote(req, res) {
  try {
    const { noteId, transcription } = req.body;
    if (!noteId || !transcription) {
      return res.status(400).json({ message: "noteId and transcription are required" });
    }
    const response = await openAi.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a knowledgeable assistant that analyzes handwritten notes.
Break the transcription into semantically coherent blocks and suggest relevant further reading for each.

Return a JSON object with this exact structure:
{
  "blocks": [
    {
      "id": "block_1",
      "text": "the exact segment of text from the transcription this block covers",
      "type": "concept | task | idea | reflection | question",
      "summary": "a short 3-7 word label describing this block",
      "references": [
        {
          "title": "Specific book, paper, article, framework, or concept name",
          "type": "book | article | paper | concept | tool",
          "description": "1-2 sentences on why this is directly relevant to the block"
        }
      ]
    }
  ]
}

Rules:
- Every part of the transcription must appear in at least one block — full coverage
- Each block is one coherent unit of meaning (one idea, task, reflection, etc.)
- Provide 1-3 references per block — be specific, not generic (name real books, papers, frameworks)
- Keep summaries short and scannable`,
        },
        {
          role: "user",
          content: transcription,
        },
      ],
      max_tokens: 3000,
    });

    const aiAnalysis = JSON.parse(response.choices[0].message.content);
    const note = await notesModel.findByIdAndUpdate(
      noteId,
      { aiAnalysis },
      { new: true },
    );
    return res.status(200).json({ note });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to analyze note" });
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

module.exports = { convertNoteToText, getUserNotes, addUserNote, analyzeNote, deleteNote };
