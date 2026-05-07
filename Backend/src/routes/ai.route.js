const { Router } = require("express");
const aiController = require("../controllers/ai.controller");

const aiRouter = Router();

/**
 * @route POST /api/ai/convertNote
 * @description Convert a note to english text using AI
 * @access Private
 */
aiRouter.post("/convertNote", aiController.convertNoteToText);
