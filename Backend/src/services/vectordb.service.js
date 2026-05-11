const { Pinecone } = require("@pinecone-database/pinecone");

let index;

function getIndex() {
  if (!index) {
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    index = pc.index(process.env.PINECONE_INDEX);
  }
  return index;
}

/**
 * Store chunk embeddings for a note in the user's namespace.
 * @param {string} userId
 * @param {string} noteId
 * @param {{ text: string, embedding: number[] }[]} chunks
 */
async function upsertChunks(userId, noteId, chunks) {
  const ns = getIndex().namespace(userId);
  const vectors = chunks.map((chunk, i) => ({
    id: `${noteId}-chunk-${i}`,
    values: chunk.embedding,
    metadata: { text: chunk.text, noteId },
  }));
  await ns.upsert(vectors);
}

/**
 * Find the top-K most relevant chunks for a given query embedding.
 * @param {string} userId
 * @param {number[]} queryEmbedding
 * @param {number} topK
 * @returns {Promise<{ text: string, noteId: string, score: number }[]>}
 */
async function queryChunks(userId, queryEmbedding, topK = 5) {
  const ns = getIndex().namespace(userId);
  const result = await ns.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });
  return result.matches.map((match) => ({
    text: match.metadata.text,
    noteId: match.metadata.noteId,
    score: match.score,
  }));
}

module.exports = { upsertChunks, queryChunks };
