import { useState } from "react";
import { useUser } from "../hooks/useUser";
import type { AnalysisBlock, Note } from "../../../types/types";

type NoteViewProps = {
  note: Note;
};

const BLOCK_TYPE_LABELS: Record<AnalysisBlock["type"], string> = {
  concept: "Concept",
  task: "Task",
  idea: "Idea",
  reflection: "Reflection",
  question: "Question",
};

const REFERENCE_TYPE_LABELS: Record<string, string> = {
  book: "Book",
  article: "Article",
  paper: "Paper",
  concept: "Concept",
  tool: "Tool",
};

const NoteView = ({ note }: NoteViewProps) => {
  const { analyzeNote } = useUser();
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    await analyzeNote(note);
    setAnalyzing(false);
  };

  const blocks = note.aiAnalysis?.blocks ?? [];
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) ?? null;

  return (
    <div className="note-view">
      <div className="note-view-header">
        <h2 className="note-view-title">{note.title}</h2>
        {!note.aiAnalysis && (
          <button
            className="button primary-button"
            onClick={handleAnalyze}
            disabled={analyzing}
          >
            {analyzing ? "Analyzing..." : "Analyze Note"}
          </button>
        )}
      </div>

      <div className="note-panels">
        {/* Left — transcription or blocks */}
        {note.aiAnalysis ? (
          <section className="note-section note-blocks-panel">
            <h3 className="note-section-label">Note Blocks</h3>
            <ul className="block-list">
              {blocks.map((block) => (
                <li
                  key={block.id}
                  className={`block-item${selectedBlockId === block.id ? " block-item--active" : ""}`}
                  onClick={() =>
                    setSelectedBlockId(selectedBlockId === block.id ? null : block.id)
                  }
                >
                  <div className="block-item-header">
                    <span className={`block-type-tag block-type--${block.type}`}>
                      {BLOCK_TYPE_LABELS[block.type]}
                    </span>
                    <span className="block-summary">{block.summary}</span>
                  </div>
                  <p className="block-text">{block.text}</p>
                  {block.priorConnection && (
                    <p className="block-prior-connection">{block.priorConnection}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="note-section">
            <h3 className="note-section-label">Transcription</h3>
            <p className="note-transcription-text">{note.transcription}</p>
          </section>
        )}

        {/* Right — references for selected block, or placeholder */}
        <section className="note-section note-references-panel">
          <h3 className="note-section-label">Further Reading</h3>
          {analyzing && (
            <div className="temporary-text">Analyzing your note...</div>
          )}
          {!analyzing && !note.aiAnalysis && (
            <div className="temporary-text">Analyze the note to see suggested readings</div>
          )}
          {note.aiAnalysis && !selectedBlock && (
            <div className="temporary-text">Click a block to see references</div>
          )}
          {selectedBlock && (
            <ul className="reference-list">
              {selectedBlock.references.map((ref, i) => (
                <li key={i} className="reference-item">
                  <div className="reference-header">
                    <span className={`reference-type-tag reference-type--${ref.type}`}>
                      {REFERENCE_TYPE_LABELS[ref.type] ?? ref.type}
                    </span>
                    <span className="reference-title">{ref.title}</span>
                  </div>
                  <p className="reference-description">{ref.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default NoteView;
