export type UserProps = {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
};
export type RegisterProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
export type LoginProps = {
  email: string;
  password: string;
};
export type ConvertNotesProps = {
  encodedImage: string;
};

export type Reference = {
  title: string;
  type: "book" | "article" | "paper" | "concept" | "tool";
  description: string;
};

export type AnalysisBlock = {
  id: string;
  text: string;
  type: "concept" | "task" | "idea" | "reflection" | "question";
  summary: string;
  priorConnection: string | null;
  references: Reference[];
};

export type NoteAnalysis = {
  blocks: AnalysisBlock[];
};

export type Note = {
  _id: string;
  title: string;
  userId: string;
  transcription: string;
  aiAnalysis: NoteAnalysis | null;
  createdAt?: string;
};
