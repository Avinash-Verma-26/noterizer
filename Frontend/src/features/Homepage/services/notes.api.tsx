import axios from "axios";
import type { ConvertNotesProps } from "../../../types/types";
import { serverUrl } from "../../../main";
import type { Note } from "../user.context";

/**
 * @name convertNote
 * @description Handles conversion of note from image to text via backend requires the base64 encoded string of the image
 * @access Private
 */
export async function convertNoteToText({ encodedImage }: ConvertNotesProps) {
  try {
    const response = await axios.post(
      `${serverUrl}/ai/convertNote`,
      { encodedImage },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log("Failed to convert image to text", error);
    throw error;
  }
}
/**
 * @name aiAnalayzeNote
 * @description Sends a text body to be analyzed by the AI.
 * @access Private
 */
export async function aiAnalyzeNote(transcription: string) {
  try {
    const response = await axios.post(
      `${serverUrl}/ai/analyzeNote`,
      { transcription },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {}
}

/**
 * @name getUserNotes
 * @description Gets all the notes a user has in their library - based on the cookie with the user
 * @access Private
 */
export async function getUserNotes() {
  try {
    const response = await axios.get(`${serverUrl}/ai/getUserNotes`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * @name addNoteToLibrary
 * @description Adds the current note to the user library and the notes database as well
 * @access Private
 */
export async function addNoteToLibrary(note: Note) {
  try {
    await axios.post(
      `${serverUrl}/ai/addUserNote`,
      { note },
      { withCredentials: true },
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
}
