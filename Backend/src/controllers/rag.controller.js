const OpenAI = require("openai");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { OpenAIEmbeddings } = require("@langchain/openai");
const notesModel = require("../models/notes.model");
const userModel = require("../models/user.model");
const { upsertChunks, queryChunks } = require("../services/vectordb.service");

let openAi;
let embeddings;

function getOpenAi() {
  if (!openAi) openAi = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  return openAi;
}

function getEmbeddings() {
  if (!embeddings) {
    embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPEN_AI_API_KEY,
      model: "text-embedding-3-small",
    });
  }
  return embeddings;
}

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 300,
  chunkOverlap: 50,
  separators: ["\n\n", "\n", ". ", "! ", "? ", " ", ""],
});

async function chunkAndEmbed(text) {
  const emb = getEmbeddings();
  const docs = await splitter.createDocuments([text]);
  const chunks = docs.length > 0 ? docs.map((doc) => doc.pageContent) : [text];
  const embeddingVectors = await emb.embedDocuments(chunks);
  return chunks.map((chunk, i) => ({ text: chunk, embedding: embeddingVectors[i] }));
}

/**
 * @name addNoteToLibrary
 * @description Saves a note to MongoDB, updates the user record, then chunks + embeds into Pinecone
 * @access Private
 */
async function addNoteToLibrary(req, res) {
  try {
    const userId = req.user.id;
    const { title, transcription } = req.body;

    if (!title?.trim() || !transcription?.trim()) {
      return res.status(400).json({ message: "Title and transcription are required" });
    }

    const note = await notesModel.create({ userId, title: title.trim(), transcription: transcription.trim() });
    await userModel.findByIdAndUpdate(userId, { $push: { notes: note._id } });

    // chunk + embed in background so response is instant
    chunkAndEmbed(note.transcription)
      .then((chunks) => chunks.length > 0 && upsertChunks(userId, note._id.toString(), chunks))
      .catch((err) => console.error("RAG indexing failed:", err));

    return res.status(201).json({ note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to save note" });
  }
}

/**
 * @name analyzeNote
 * @description Retrieves relevant chunks from Pinecone, then uses GPT-4o to produce
 *              structured JSON blocks enriched with cross-note context
 * @access Private
 */
async function analyzeNote(req, res) {
  try {
    const userId = req.user.id;
    const { noteId, transcription } = req.body;

    if (!noteId || !transcription) {
      return res.status(400).json({ message: "noteId and transcription are required" });
    }

    // embed the note and query for semantically related chunks from prior notes
    const [queryEmbedding] = await getEmbeddings().embedDocuments([transcription]);
    const relevantChunks = await queryChunks(userId, queryEmbedding, 5);

    // exclude chunks from the note being analyzed
    const priorChunks = relevantChunks.filter((c) => c.noteId !== noteId);

    const contextBlock =
      priorChunks.length > 0
        ? priorChunks.map((c, i) => `[Prior Note Excerpt ${i + 1}]:\n${c.text}`).join("\n\n")
        : null;

    const response = await getOpenAi().chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a knowledgeable study coach that analyzes handwritten notes.
Break the transcription into semantically coherent blocks and suggest relevant further reading for each.
${contextBlock ? `\nYou also have access to relevant excerpts from the student's previous notes. Use these to enrich your analysis — note connections, reinforce prior concepts, and surface gaps the student has not yet bridged:\n\n${contextBlock}\n` : ""}
Return a JSON object with this exact structure:
{
  "blocks": [
    {
      "id": "block_1",
      "text": "the exact segment of text from the transcription this block covers",
      "type": "concept | task | idea | reflection | question",
      "summary": "a short 3-7 word label describing this block",
      "priorConnection": "one sentence on how this connects to prior notes, or null if no prior context",
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
- Keep summaries short and scannable
- Only set priorConnection if it is genuinely meaningful — do not force it`,
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
    console.error(error);
    return res.status(500).json({ message: "Failed to analyze note" });
  }
}

module.exports = { addNoteToLibrary, analyzeNote };
