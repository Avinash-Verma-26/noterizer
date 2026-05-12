import "../homepage.styles.css";
import { useState, Component } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Auth/hooks/useAuth";
import { useUser } from "../hooks/useUser";
import DropZone from "../components/DropZone";
import AnalyzeImage from "../components/AnalyzeImage";
import NoteLibrary from "../components/NoteLibrary";
import NoteView from "../components/NoteView";
import type { Note } from "../../../types/types";

class LibraryErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <aside className="note-library" style={{ padding: "1rem", fontSize: "0.8rem", color: "salmon" }}>
          Library error: {this.state.error.message}
        </aside>
      );
    }
    return this.props.children;
  }
}

type View = "upload" | "analyze" | "note";

const Homepage = () => {
  const [view, setView] = useState<View>("upload");
  const [noteImage, setNoteImage] = useState<string>("");
  const { user, handleLogout } = useAuth();
  const { userNotes, currentNote, setCurrentNote } = useUser();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  // Wraps the boolean dispatcher DropZone expects — true means image selected, false means reset
  const handleSetHasImage: React.Dispatch<React.SetStateAction<boolean>> = (action) => {
    const next = typeof action === "function" ? action(view === "analyze") : action;
    setView(next ? "analyze" : "upload");
  };

  const handleSelectNote = (note: Note) => {
    setCurrentNote?.(note);
    setView("note");
  };

  const handleNewNote = () => {
    setNoteImage("");
    setView("upload");
  };

  const handleNoteSaved = () => {
    setView("note");
  };

  if (!user) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="home-container">
      <header className="home-header">
        <p className="home-greeting">
          Hey, <strong>{user.firstname} {user.lastname}</strong>
        </p>
        <button onClick={handleLogoutClick} className="button primary-button">
          Logout
        </button>
      </header>

      <div className="home-body">
        <LibraryErrorBoundary>
          <NoteLibrary
            notes={userNotes ?? []}
            currentNoteId={currentNote?._id ?? null}
            onSelectNote={handleSelectNote}
            onNewNote={handleNewNote}
          />
        </LibraryErrorBoundary>

        <section className="note-viewer">
          {(view === "upload" || (view === "note" && !currentNote)) && (
            <DropZone
              setHasImage={handleSetHasImage}
              setNoteImage={setNoteImage}
            />
          )}
          {view === "analyze" && (
            <AnalyzeImage
              setHasImage={handleSetHasImage}
              noteImage={noteImage}
              onNoteSaved={handleNoteSaved}
            />
          )}
          {view === "note" && currentNote && (
            <NoteView note={currentNote} />
          )}
        </section>
      </div>
    </main>
  );
};

export default Homepage;
