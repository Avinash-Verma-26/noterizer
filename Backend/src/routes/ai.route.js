const { Router } = require("express");
const aiController = require("../controllers/ai.controller");
const ragController = require("../controllers/rag.controller");
const { authUser } = require("../middlewares/auth.middleware");

const aiRouter = Router();

/**
 * @route POST /api/ai/convertNote
 * @description Convert a note to english text using AI
 * @access Private
 */
aiRouter.post("/convertNote", authUser, aiController.convertNoteToText);

/**
 * @route GET /api/ai/getUserNotes
 * @description Get all notes for the current user
 * @access Private
 */
aiRouter.get("/getUserNotes", authUser, aiController.getUserNotes);

/**
 * @route POST /api/ai/addUserNote
 * @description Save a note to MongoDB, update user record, and index chunks in Pinecone
 * @access Private
 */
aiRouter.post("/addUserNote", authUser, ragController.addNoteToLibrary);

/**
 * @route POST /api/ai/analyzeNote
 * @description Retrieve relevant chunks from Pinecone and generate structured GPT-4o analysis
 * @access Private
 */
aiRouter.post("/analyzeNote", authUser, ragController.analyzeNote);

/**
 * @route DELETE /api/ai/deleteNote/:noteId
 * @description Delete a note by ID
 * @access Private
 */
aiRouter.delete("/deleteNote/:noteId", authUser, aiController.deleteNote);

module.exports = aiRouter;
