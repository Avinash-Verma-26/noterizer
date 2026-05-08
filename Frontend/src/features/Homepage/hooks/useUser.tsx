import { useContext } from "react";
import { UserContext, type Note } from "../user.context";
import {
  addNoteToLibrary,
  aiAnalyzeNote,
  convertNoteToText,
} from "../services/notes.api";

export const useUser = () => {
  const context = useContext(UserContext);
  const userNotes = context?.userNotes;
  const setUserNotes = context?.setUserNotes;
  const currentNote = context?.currentNote;
  const setCurrentNote = context?.setCurrentNote;

  const convertNote = async (encodedImage: string) => {
    try {
      const data = await convertNoteToText({ encodedImage: encodedImage });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const analyzeNote = async (note: Note) => {
    try {
      const data = await aiAnalyzeNote(note.transcription);
      note.aiAnalysis = data;
      return note;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const addNote = async (note: Note) => {
    try {
      await addNoteToLibrary(note);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return {
    userNotes,
    setUserNotes,
    currentNote,
    setCurrentNote,
    convertNote,
    analyzeNote,
    addNote,
  };
};
