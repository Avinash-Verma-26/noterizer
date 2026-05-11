const { Router } = require("express");
const aiController = require("../controllers/ai.controller");
const { authUser } = require("../middlewares/auth.middleware");

const aiRouter = Router();

/**
 * @route POST /api/ai/convertNote
 * @description Convert a note to english text using AI
 * @access Private
 */
aiRouter.post("/convertNote", authUser, aiController.convertNoteToText);

/**
 * @route GET /api/ai/userNotes
 * @description Get all notes for the current user
 * @access Private
 */
aiRouter.get("/getUserNotes", authUser, aiController.getUserNotes);

/**
 * @route POST /api/ai/addUserNote
 * @description Save a converted note to the library
 * @access Private
 */
aiRouter.post("/addUserNote", authUser, aiController.addUserNote);

/**
 * @route POST /api/ai/analyzeNote
 * @description Analyze a saved note with AI
 * @access Private
 */
aiRouter.post("/analyzeNote", authUser, aiController.analyzeNote);

/**
 * @route DELETE /api/ai/deleteNote/:noteId
 * @description Delete a note by ID
 * @access Private
 */
aiRouter.delete("/deleteNote/:noteId", authUser, aiController.deleteNote);

module.exports = aiRouter;
