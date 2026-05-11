import ReactMarkdown from "react-markdown";
type OCRViewProps = {
  ocr: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};
const OCRView = ({ ocr, setTitle, title }: OCRViewProps) => {
  return (
    <form className="add-note-form">
      <input
        className="title-input"
        type="text"
        placeholder="Add a title for the note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="markdown-holder">
        <ReactMarkdown>{ocr}</ReactMarkdown>
      </div>
    </form>
  );
};

export default OCRView;
