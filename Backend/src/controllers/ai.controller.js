const OpenAI = require("openai");
const openAi = new OpenAI({ apikey: process.env.OPEN_AI_API_KEY });

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
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:${mediaType};base64,${encodedImage}` },
          },
          { type: "text", text: "Transcribe all text from this image." },
        ],
      },
    ],
    max_tokens: 2048,
  });

  const text = response.choices[0].message.content;
  return res.status(200).json({ text });
}

module.exports = { convertNoteToText };
