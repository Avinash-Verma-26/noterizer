import { useUser } from "../hooks/useUser";
import type { Note } from "../../../types/types";

type NoteLibraryProps = {
  notes: Note[];
  currentNoteId: string | null;
  onSelectNote: (note: Note) => void;
  onNewNote: () => void;
};

const NoteLibrary = ({
  notes,
  currentNoteId,
  onSelectNote,
  onNewNote,
}: NoteLibraryProps) => {
  const { deleteNote } = useUser();

  return (
    <aside className="note-library">
      <div className="library-header">
        <span className="note-count">{notes.length} {notes.length === 1 ? "Note" : "Notes"}</span>
        <button className="button primary-button new-note-btn" onClick={onNewNote}>
          + New Note
        </button>
      </div>
      <ul className="note-list">
        {notes.length === 0 && (
          <li className="note-list-empty">No notes yet. Convert an image to get started.</li>
        )}
        {notes.map((note) => (
          <li
            key={note._id}
            className={`note-card${currentNoteId === note._id ? " note-card--active" : ""}`}
            onClick={() => onSelectNote(note)}
          >
            <div className="note-card-top">
              <span className="note-card-title">{note.title}</span>
              <button
                className="note-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note._id);
                }}
                title="Delete note"
              >
                ✕
              </button>
            </div>
            <div className="note-card-meta">
              <span className={`note-tag${note.aiAnalysis ? " note-tag--analyzed" : ""}`}>
                {note.aiAnalysis ? "Analyzed" : "Not Analyzed"}
              </span>
              {note.createdAt && (
                <span className="note-date">
                  {new Date(note.createdAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NoteLibrary;
