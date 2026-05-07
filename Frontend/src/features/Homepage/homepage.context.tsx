import { createContext, useEffect, type ReactNode } from "react";

type Note = {
  _id: string;
  transcription: string;
  aiAnalysis: string | null;
};
type HomeageContextType = {
  notes: Note[];
  currentNote: Note | null;
  setCurrentNote: (note: Note) => void;
  convertNote;
};

export const HomepageContext = createContext<null>(null);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const getUserData = async () => {
      try {
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
};
