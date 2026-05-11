import axios from "axios";
import type { ConvertNotesProps } from "../../../types/types";
import { serverUrl } from "../../../main";

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

export async function aiAnalyzeNote(noteId: string, transcription: string) {
  try {
    const response = await axios.post(
      `${serverUrl}/ai/analyzeNote`,
      { noteId, transcription },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log("Failed to analyze note", error);
    throw error;
  }
}

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

export async function deleteNoteById(noteId: string) {
  try {
    await axios.delete(`${serverUrl}/ai/deleteNote/${noteId}`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addNoteToLibrary(title: string, transcription: string) {
  try {
    const response = await axios.post(
      `${serverUrl}/ai/addUserNote`,
      { title, transcription },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
