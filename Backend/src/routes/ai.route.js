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

module.exports = aiRouter;
