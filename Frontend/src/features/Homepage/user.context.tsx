import { createContext, useEffect, useState, type ReactNode } from "react";
import { getUserNotes } from "./services/notes.api";

export type Note = {
  _id: string;
  userId: string;
  transcription: string;
  aiAnalysis: string | null;
};
type UserContextType = {
  userNotes: Note[] | null;
  setUserNotes: React.Dispatch<React.SetStateAction<Note[] | null>>;
  currentNote: Note | null;
  setCurrentNote: React.Dispatch<React.SetStateAction<Note | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userNotes, setUserNotes] = useState<Note[] | null>(null);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await getUserNotes();
        setUserNotes(data);
      } catch (err) {
        console.log(err);
      }
    };
    getNotes();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userNotes,
        setUserNotes,
        currentNote,
        setCurrentNote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
