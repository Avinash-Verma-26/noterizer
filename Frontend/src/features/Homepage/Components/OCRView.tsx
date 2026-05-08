import ReactMarkdown from "react-markdown";
type OCRViewProps = {
  ocr: string;
  title: string | null;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
};
const OCRView = ({ ocr, setTitle, title }: OCRViewProps) => {
  return (
    <form className="add-note-form">
      <input
        className="title-input"
        type="text"
        placeholder="Add a title for the Note"
        value={title ?? ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="markdown-holder">
        <ReactMarkdown>{ocr}</ReactMarkdown>
      </div>
    </form>
  );
};

export default OCRView;
