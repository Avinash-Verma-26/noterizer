import { useContext } from "react";
import { UserContext } from "../user.context";
import {
  addNoteToLibrary,
  aiAnalyzeNote,
  convertNoteToText,
  deleteNoteById,
} from "../services/notes.api";
import type { Note } from "../../../types/types";

export const useUser = () => {
  const context = useContext(UserContext);
  const userNotes = context?.userNotes;
  const setUserNotes = context?.setUserNotes;
  const currentNote = context?.currentNote;
  const setCurrentNote = context?.setCurrentNote;

  const convertNote = async (encodedImage: string) => {
    try {
      const data = await convertNoteToText({ encodedImage });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const addNote = async (title: string, transcription: string) => {
    try {
      const data = await addNoteToLibrary(title, transcription);
      const savedNote: Note = data.note;
      setUserNotes?.((prev) => (prev ? [...prev, savedNote] : [savedNote]));
      setCurrentNote?.(savedNote);
      return savedNote;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const analyzeNote = async (note: Note) => {
    try {
      const data = await aiAnalyzeNote(note._id, note.transcription);
      const updatedNote: Note = data.note;
      setUserNotes?.(
        (prev) =>
          prev?.map((n) => (n._id === updatedNote._id ? updatedNote : n)) ?? null,
      );
      setCurrentNote?.(updatedNote);
      return updatedNote;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await deleteNoteById(noteId);
      setUserNotes?.((prev) => prev?.filter((n) => n._id !== noteId) ?? null);
      if (currentNote?._id === noteId) setCurrentNote?.(null);
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
    deleteNote,
  };
};
